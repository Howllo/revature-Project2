package net.revature.project1.service;

import net.revature.project1.enumerator.FileType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

class FileServiceTest {

    private FileService fileService;
    private static final String IMAGE_SOURCE = "C:\\Users\\Allen\\Pictures\\DiscordProfile.jpg";
    private static final String VIDEO_SOURCE = "C:\\Users\\Allen\\Downloads\\Break Beat Bark Sword Art Online Ordinal Scale.mp4";
    private static final String FILE_RESOURCE_URL = "http://localhost:8080/files/";

    @TempDir
    Path tempDir;

    @BeforeEach
    void setUp() {
        fileService = new FileService();
        ReflectionTestUtils.setField(fileService, "resourcePath", tempDir.toString() + "/");
        ReflectionTestUtils.setField(fileService, "fileResourceUrl", FILE_RESOURCE_URL);
    }

    @Test
    void uploadImage_WithValidImage_ShouldSucceed() throws IOException {
        // Create test directories
        Files.createDirectories(tempDir.resolve("images"));

        // Try to use actual file, or create a test image if it doesn't exist
        Path sourceImagePath = Path.of(IMAGE_SOURCE);
        if (!Files.exists(sourceImagePath)) {
            System.out.println("Warning: Actual image not found, creating test image instead");
            sourceImagePath = tempDir.resolve("test-image.jpg");
            // Create a minimal valid JPEG file
            byte[] jpegData = {
                    (byte) 0xFF, (byte) 0xD8, // JPEG SOI marker
                    (byte) 0xFF, (byte) 0xD9  // JPEG EOI marker
            };
            Files.write(sourceImagePath, jpegData);
        }

        // Test uploading the image
        String result = fileService.uploadFile(
                FileType.IMAGE,
                sourceImagePath.toString(),
                "test-profile.jpg"
        );

        // Verify the results
        assertNotNull(result, "Upload result should not be null");
        assertTrue(result.startsWith(FILE_RESOURCE_URL), "Result should start with resource URL");
        assertTrue(result.endsWith("test-profile.jpg"), "Result should end with filename");

        // Verify the file was copied correctly
        Path destinationPath = tempDir.resolve("images/test-profile.jpg");
        assertTrue(Files.exists(destinationPath), "Destination file should exist");

        // Compare file contents
        byte[] sourceBytes = Files.readAllBytes(sourceImagePath);
        byte[] destBytes = Files.readAllBytes(destinationPath);
        assertArrayEquals(sourceBytes, destBytes, "File contents should match");
    }

    @Test
    void uploadVideo_WithValidVideo_ShouldSucceed() throws IOException {
        Files.createDirectories(tempDir.resolve("videos"));

        Path sourceVideoPath = Path.of(VIDEO_SOURCE);
        if (!Files.exists(sourceVideoPath)) {
            System.out.println("Warning: Actual video not found, creating test video instead");
            sourceVideoPath = tempDir.resolve("test-video.mp4");

            byte[] mp4Data = {
                    0x00, 0x00, 0x00, 0x20, // size
                    0x66, 0x74, 0x79, 0x70, // ftyp
                    0x69, 0x73, 0x6F, 0x6D, // isom
                    0x00, 0x00, 0x02, 0x00, // minor version
                    0x69, 0x73, 0x6F, 0x6D, // compatible brand
                    0x69, 0x73, 0x6F, 0x32, // compatible brand
                    0x61, 0x76, 0x63, 0x31, // compatible brand
                    0x6D, 0x70, 0x34, 0x31  // compatible brand
            };
            Files.write(sourceVideoPath, mp4Data);
        }

        // Test uploading the video
        String result = fileService.uploadFile(
                FileType.VIDEO,
                sourceVideoPath.toString(),
                "test-video.mp4"
        );

        // Verify the results
        assertNotNull(result, "Upload result should not be null");
        assertTrue(result.startsWith(FILE_RESOURCE_URL), "Result should start with resource URL");
        assertTrue(result.endsWith("test-video.mp4"), "Result should end with filename");

        // Verify the file was copied correctly
        Path destinationPath = tempDir.resolve("videos/test-video.mp4");
        assertTrue(Files.exists(destinationPath), "Destination file should exist");

        // Compare file contents
        byte[] sourceBytes = Files.readAllBytes(sourceVideoPath);
        byte[] destBytes = Files.readAllBytes(destinationPath);
        assertArrayEquals(sourceBytes, destBytes, "File contents should match");
    }

    @Test
    void uploadFile_WithNullParameters_ShouldThrowException() {
        assertThrows(IllegalArgumentException.class, () ->
                        fileService.uploadFile(null, "path", "filename"),
                "Should throw exception for null file type"
        );

        assertThrows(IllegalArgumentException.class, () ->
                        fileService.uploadFile(FileType.IMAGE, null, "filename"),
                "Should throw exception for null file path"
        );

        assertThrows(IllegalArgumentException.class, () ->
                        fileService.uploadFile(FileType.IMAGE, "path", null),
                "Should throw exception for null filename"
        );
    }

    @Test
    void uploadFile_WithInvalidPath_ShouldThrowException() {
        assertThrows(IOException.class, () ->
                        fileService.uploadFile(FileType.IMAGE, "nonexistent/path/file.jpg", "test.jpg"),
                "Should throw exception for invalid source path"
        );
    }

    @Test
    void uploadFile_WithUnsupportedImageType_ShouldThrowException() throws IOException {
        Path textFile = tempDir.resolve("test.txt");
        Files.write(textFile, "This is a text file".getBytes());

        assertThrows(IllegalArgumentException.class, () ->
                        fileService.uploadFile(FileType.IMAGE, textFile.toString(), "test.txt"),
                "Should throw exception for unsupported image type"
        );
    }

    @Test
    void uploadFile_WithLargeImage_ShouldThrowException() throws IOException {
        // Create test image directory
        Files.createDirectories(tempDir.resolve("images"));

        // Create a test file slightly larger than 10MB
        Path largeFile = tempDir.resolve("large-image.jpg");
        byte[] largeContent = new byte[10 * 1024 * 1024 + 1]; // 10MB + 1 byte
        Files.write(largeFile, largeContent);

        assertThrows(IllegalArgumentException.class, () ->
                        fileService.uploadFile(FileType.IMAGE, largeFile.toString(), "large-image.jpg"),
                "Should throw exception for image exceeding size limit"
        );
    }

    @Test
    void uploadFile_WithLargeVideo_ShouldThrowException() throws IOException {
        // Create test video directory
        Files.createDirectories(tempDir.resolve("videos"));

        // Create a test file slightly larger than 100MB
        Path largeFile = tempDir.resolve("large-video.mp4");
        byte[] largeContent = new byte[150 * 1024 * 1024 + 1]; // 100MB + 1 byte
        Files.write(largeFile, largeContent);

        assertThrows(IllegalArgumentException.class, () ->
                        fileService.uploadFile(FileType.VIDEO, largeFile.toString(), "large-video.mp4"),
                "Should throw exception for video exceeding size limit"
        );
    }
}