package net.revature.project1.service;

import net.revature.project1.enumerator.FileType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@Service
public class FileService {
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    @Value("${s3.bucket}")
    private String s3Bucket;

    private final List<String> fileLocation = List.of("videos", "images");

    private final List<String> allowedImageTypes = List.of(
            "image/jpeg", "image/png", "image/jpg", "image/gif", "image/bmp", "image/ico",
            "image/tif", "image/tiff", "image/webp", "image/svg", "image/svgz", "image/ai", "image/drw",
            "image/pct", "image/psp", "image/xcf", "image/psd", "image/raw", "image/heic"
    );

    private final List<String> allowedVideoTypes = List.of(
            "video/mp4", "video/m4a", "video/m4b", "video/webm", "video/mov", "video/gif"
    );

    /**
     * Upload a file to the server.
     * @param fileType The type of file to upload.
     * @param filePath The path to the file.
     * @param fileName The name of the file.
     * @return The URL of the uploaded file.
     * @throws IOException If an I/O error occurs.
     */
    public String uploadFile(FileType fileType, String filePath, String fileName) throws IOException {
        if (fileType == null || filePath == null || fileName == null) {
            throw new IllegalArgumentException("File path and name cannot be null");
        }

        String pathBucketKey = "";

        long maxImageSize = 10 * 1024 * 1024;
        long maxVideoSize = 150 * 1024 * 1024;

        Path fromPath = Paths.get(filePath);
        long fileSize = Files.size(fromPath);

        String mimeType = Files.probeContentType(fromPath);
        List<String> allowedTypes;

        switch (fileType) {
            case IMAGE:
                allowedTypes = allowedImageTypes;

                if (!allowedImageTypes.contains(mimeType)) {
                    logger.warn("Unsupported image type: {}", mimeType);
                    throw new IllegalArgumentException("Unsupported image type: " + mimeType);
                }

                if (fileSize > maxImageSize) {
                    logger.warn("Image exceeds maximum size: {} bytes", fileSize);
                    throw new IllegalArgumentException("Image exceeds maximum size of 10 MB");
                }

                pathBucketKey = "images/" + fileName;
                break;

            case VIDEO:
                allowedTypes = allowedVideoTypes;

                if (!allowedVideoTypes.contains(mimeType)) {
                    logger.warn("Unsupported video type: {}", mimeType);
                    throw new IllegalArgumentException("Unsupported video type: " + mimeType);
                }

                if (fileSize > maxVideoSize) {
                    logger.warn("Video exceeds maximum size: {} bytes", fileSize);
                    throw new IllegalArgumentException("Video exceeds maximum size of 100 MB");
                }
                pathBucketKey = "videos/" + fileName;
                break;

            default:
                logger.error("Unsupported file type: {}", fileType);
                return null;
        }

        try (S3Client s3Client = S3Client.builder()
                .region(Region.US_EAST_2)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build())
        {
            PutObjectRequest putOb = PutObjectRequest.builder()
                    .bucket(s3Bucket)
                    .key(pathBucketKey)
                    .build();

            s3Client.putObject(putOb, RequestBody.fromFile(fromPath));
        }
        catch (RuntimeException e) {
            logger.error("Error while uploading file: ", e);
        }

        String url = "https://" + s3Bucket + ".s3." + "us-east-2" + ".amazonaws.com/" + pathBucketKey;
        return url.replace("\"", "");
    }

    /**
     * Create a new file and a temporary file based on a base64 encoding.
     * @param post Take in the post to set the new media URL.
     * @throws IOException If it fails to create a file it throws the exception.
     */

    public String createFile(String post) throws IOException {
        String[] parts = post.split(",");

        String imageType = parts[0].split(";")[0].split(":")[1];
        byte[] imageBytes = Base64.getDecoder().decode(parts[1]);

        String extension = getExtensionFromMimeType(imageType);
        String tempFileName = UUID.randomUUID() + "." + extension;

        Path tempPath = Paths.get(System.getProperty("java.io.tmpdir"), tempFileName);
        Files.write(tempPath, imageBytes);
        FileType fileType = imageType.startsWith("video/") ? FileType.VIDEO : FileType.IMAGE;

        String mediaUrl = uploadFile(fileType, tempPath.toString(), tempFileName);
        Files.deleteIfExists(tempPath);

        return mediaUrl;
    }

    /**
     * Used to delete objects from the S3 Bucket.
     * @param filePath Take in a file path to find to create an object key.
     * @return {@Code True} if the was successful in deleting and {@Code False} if it failed to delete.
     */
    public boolean deleteFile(String filePath) {
        String[] parts = filePath.split("/");
        final int length = parts.length;
        String objectKey = filePath.split("/")[length - 1];

        try (S3Client s3Client = S3Client.builder()
                .region(Region.US_EAST_2)
                .credentialsProvider(DefaultCredentialsProvider.create())
                .build())
        {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(s3Bucket)
                    .key(objectKey)
                    .build();
            s3Client.deleteObject(deleteObjectRequest );
        }
        catch (RuntimeException e) {
            logger.error("Error while deleting file: ", e);
            return false;
        }
        return true;

    }

    private String getExtensionFromMimeType(String mimeType) {
        return switch (mimeType) {
            case "image/jpeg" -> "jpg";
            case "image/png" -> "png";
            case "image/gif" -> "gif";
            case "video/mp4" -> "mp4";
            default -> "jpg";  // Default to jpg if unknown
        };
    }
}