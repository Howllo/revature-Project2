package net.revature.project1.service;

import net.revature.project1.dto.*;
import net.revature.project1.entity.AppUser;
import net.revature.project1.entity.Post;
import net.revature.project1.enumerator.PostEnum;
import net.revature.project1.result.PostResult;
import net.revature.project1.security.JwtTokenUtil;
import org.hibernate.service.spi.InjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import net.revature.project1.repository.PostRepo;

import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.ReflectionTestUtils.setField;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @InjectMocks
    private PostService postService;

    @Mock
    private JwtTokenUtil jwtTokenUtil;

    @Mock
    private PostRepo postRepo;

    @Mock
    private UserService userService;

    @Mock
    FileService fileService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testGetAllPosts() throws NoSuchFieldException, IllegalAccessException {
        // Arrange
        AppUser user = new AppUser("test@example.com", "testUser", "password123");
        user.setDisplayName("Test User");

        Post parentPost = new Post(user, "Parent Comment");
        setField(parentPost, "id", 1L);
        parentPost.setPostEdited(false);
        parentPost.setMedia(null);
        parentPost.setPostAt(new Timestamp(System.currentTimeMillis()));

        Post childPost = new Post(user, "Child Comment");
        setField(childPost, "id", 2L);
        // Directly set the parentPost field using reflection since there is no setter
        setField(childPost, "postParent", parentPost);

        List<Post> listOfPosts = Arrays.asList(parentPost, childPost);

        when(postRepo.findAll()).thenReturn(listOfPosts);
        setField(postService, "postRepo", postRepo);

        // Act
        List<PostResponseDto> result = postService.getAllPosts();

        // Assert
        assertEquals(1, result.size());

        PostResponseDto dto = result.get(0);
        assertEquals(parentPost.getId(), dto.id());
        assertEquals(-1L, dto.parentPost());
        assertEquals(user.getId(), dto.userId());
        assertEquals(user.getUsername(), dto.username());
        assertEquals(user.getDisplayName(), dto.displayName());
        assertEquals(parentPost.getComment(), dto.comment());
        assertEquals(parentPost.getMedia(), dto.media());
        assertEquals(parentPost.isPostEdited(), dto.postEdit());
        assertEquals(parentPost.getPostAt(), dto.postAt());
        assertEquals(parentPost.getLikes().size(), dto.likeCount());
        assertEquals((long) parentPost.getComment().length(), dto.commentCount());
    }

    @Test
    void testGetPost_Found() throws NoSuchFieldException, IllegalAccessException {
        // Arrange
        Long postId = 1L;
        Timestamp postAt = Timestamp.valueOf("2023-12-30 10:00:00");
        PostSmallResponseDto expectedPost = new PostSmallResponseDto(
                1L,             // id
                -1L,            // parentPost
                "user123",      // username
                "User Display", // displayName
                "Sample Media", // media
                false,          // postEdit
                postAt          // postAt
        );

        when(postRepo.getUserPost(postId)).thenReturn(Optional.of(expectedPost));

        setField(postService, "postRepo", postRepo);

        // Act
        PostSmallResponseDto actualPost = postService.getPost(postId);

        // Assert
        assertEquals(expectedPost, actualPost, "The returned post should match the expected post.");
    }

    @Test
    void testGetPost_NotFound() {
        // Arrange
        Long postId = 2L;

        lenient().when(postRepo.getUserPost(postId)).thenReturn(Optional.empty());

        // Act
        PostSmallResponseDto actualPost = postService.getPost(postId);

        // Assert
        assertNull(actualPost, "The returned post should be null when not found.");
    }

    @Test
    void testGetUserFeed() throws NoSuchFieldException, IllegalAccessException {
        // Arrange
        Long userId = 1L;
        Long lastPostId = 0L;
        Integer chunkSize = 2;

        // Creating mock posts
        Post post1 = new Post();
        setField(post1, "id", 1L); // Setting the id via reflection

        Post post2 = new Post();
        setField(post2, "id", 2L);

        Post post3 = new Post();
        setField(post3, "id", 3L);

        List<Post> posts = Arrays.asList(post1, post2, post3);

        // Mocking repository call to return the list of posts
        when(postRepo.getFollowingPostsChunk(userId, lastPostId, chunkSize)).thenReturn(posts);

        setField(postService, "postRepo", postRepo);

        // Creating PostFeedRequest
        List<Long> seenPostId = new ArrayList<>();
        PostFeedRequest request = new PostFeedRequest(userId, seenPostId, lastPostId);

        // Act
        PostFeedResponse response = postService.getUserFeed(request, chunkSize);

        // Assert
        assertNotNull(response, "Response should not be null");

        // Extracting fields from the PostFeedResponse (since it's a record)
        List<Long> seenPostIds = response.seenPostId();


        // Verifying that the seenPostId list has the IDs of the posts
        assertTrue(seenPostIds.contains(1L), "Seen post ID list should contain post 1 ID");
        assertTrue(seenPostIds.contains(2L), "Seen post ID list should contain post 2 ID");
        assertFalse(seenPostIds.contains(3L), "Seen post ID list should not contain post 3 ID");

        // Verify the repository method was called with correct parameters
        verify(postRepo, times(1)).getFollowingPostsChunk(userId, lastPostId, chunkSize);
    }

    // Helper method to set the field via reflection (for private fields)
    private void setField(Object target, String fieldName, Object value) throws NoSuchFieldException, IllegalAccessException {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    @Test
    public void testCreatePost_InvalidPost_NoCommentOrMedia() {
        // Arrange
//        Post invalidPost = new Post(); // No comment or media set
//        String token = "validToken";
//
//        // Act
//        PostResult result = postService.createPost(invalidPost, token);
//
//        // Assert
//        assertNotNull(result, "Result should not be null");
//        assertEquals(PostEnum.INVALID_POST, result.postEnum(), "PostEnum should be INVALID_POST");
//        assertEquals("Post must have a comment, image, or video.", result.message(), "Error message should match");
//        assertNull(result.post(), "PostResponseDto should be null for an invalid post");
    }

    @Test
    public void testCreatePost_InvalidComment_TooLong() {
//        // Arrange
//        Post invalidPost = new Post();
//        invalidPost.setComment("a".repeat(256)); // A comment with 256 characters
//        String token = "validToken";
//
//        // Act
//        PostResult result = postService.createPost(invalidPost, token);
//
//        // Assert
//        assertNotNull(result, "Result should not be null");
//        assertEquals(PostEnum.INVALID_COMMENT, result.postEnum(), "PostEnum should be INVALID_COMMENT");
//        assertEquals("Comment is too long.", result.message(), "Error message should match");
//        assertNull(result.post(), "PostResponseDto should be null for an invalid comment");
    }

    @Test
    public void testCreatePost_InvalidToken_UserMismatch() throws NoSuchFieldException, IllegalAccessException {
//        // Arrange
//        Post post = new Post();
//        AppUser user = new AppUser("email", "username", "password");
//        setField(user, "id", 1L);
//        setField(post, "user", user);
//        setField(post, "comment", "sample comment");
//
//
//        String token = "invalidToken";
//
//        // Mock behavior of jwtTokenUtil to return a username
//        lenient().when(jwtTokenUtil.getUsernameFromToken(token)).thenReturn("differentUser");
//
//        // Mock behavior of userService to return a different user
//        lenient().when(userService.findByUsername("differentUser")).thenReturn(Optional.of(new AppUser("email2", "differentUser", "pass1")));
//
//        // Act
//        PostResult result = postService.createPost(post, token);
//
//        // Assert
//        assertNotNull(result, "Result should not be null");
//        assertEquals(PostEnum.INVALID_POST, result.postEnum(), "PostEnum should be INVALID_POST");
//        assertEquals("User and post are not the same", result.message(), "Error message should match");
//        assertNull(result.post(), "PostResponseDto should be null for an invalid token");
    }

//    @Test
//    public void testCreatePost_FileCreationIOException() throws IOException, NoSuchFieldException, IllegalAccessException {
//        // Arrange
//        Post post = new Post();
//        post.setMedia("sampleMediaString"); // Non-YouTube media
//        post.setComment(null);
//
//        AppUser user = new AppUser("email", "username", "password");
//        setField(post, "user", user);
//
//        String token = "validToken";
//
//        // Mock valid token behavior
//        when(jwtTokenUtil.getUsernameFromToken(token)).thenReturn("username");
//        when(userService.findByUsername("username")).thenReturn(Optional.of(user));
//
//        // Mock isValidToken to return true
//        doReturn(true).when(postService).isValidToken(token, post);
//
//        // Mock fileService to throw IOException
//        doThrow(new IOException("File creation error")).when(fileService).createFile(post);
//
//        // Act
//        PostResult result = postService.createPost(post, token);
//
//        // Assert
//        assertNotNull(result, "Result should not be null");
//        assertEquals(PostEnum.INVALID_POST, result.postEnum(), "PostEnum should be INVALID_POST");
//        assertEquals("File could not be created.", result.message(), "Error message should match");
//        assertNull(result.post(), "PostResponseDto should be null for file creation error");
//    }

//    @Test
//    public void testCreatePost_Success() throws NoSuchFieldException, IllegalAccessException, IOException {
//        // Arrange
//        Post post = new Post();
//        setField(post, "media", "sampleMediaString");
//        setField(post, "comment", "This is a valid comment");
//
//        AppUser user = new AppUser("email", "username", "password");
//        setField(post, "user", user);
//
//        String token = "validToken";
//
//        PostResponseDto mockResponseDto = new PostResponseDto(1L, 1L, 1L, "user_name", "display",
//                "This is a comment", "sample media", false, Timestamp.valueOf("2023-01-01 00:00:00"), 2, 2L);
//
//        // Mock token behavior
//        when(jwtTokenUtil.getUsernameFromToken(token)).thenReturn("username");
//        when(userService.findByUsername("username")).thenReturn(Optional.of(user));
//        doReturn(true).when(postService).isValidToken(token, post);
//
//        // Mock fileService and postRepo behavior
//        doNothing().when(fileService).createFile(post);
//        when(postRepo.save(post)).thenAnswer(invocation -> {
//            Post savedPost = invocation.getArgument(0);
//            setField(savedPost, "id", 1L); // Simulate the database setting an ID
//            return savedPost;
//        });
//
//        // Mock getPostResponseDto
//        when(postService.getPostResponseDto(post)).thenReturn(mockResponseDto);
//
//        setField(postService, "postRepo", postRepo);
//
//        System.out.println("post = " + post);
//
//        // Act
//        PostResult result = postService.createPost(post, token);
//
//        // Assert
//        assertNotNull(result, "Result should not be null");
//        assertEquals(PostEnum.SUCCESS, result.postEnum(), "PostEnum should be SUCCESS");
//        assertNull(result.message(), "Message should be null for successful post");
//        assertNotNull(result.post(), "PostResponseDto should not be null");
//        assertEquals(mockResponseDto, result.post(), "PostResponseDto should match the mock");
//
//        // Verify interactions
//        verify(postRepo).save(post);
//    }

    @Test
    void testUpdatePost_PostDoesNotExist() throws NoSuchFieldException, IllegalAccessException {
        // Arrange
        Long postId = 1L;
        when(postRepo.findById(postId)).thenReturn(Optional.empty());
        setField(postService, "postRepo", postRepo);

        PostUpdateDto postUpdateDto = new PostUpdateDto(1, "This is a comment", Timestamp.valueOf("2023-01-01 00:00:00"));

        // Act
        PostResult result = postService.updatePost(postId, postUpdateDto, "token");

        // Assert
        assertEquals(PostEnum.INVALID_POST, result.postEnum());
        assertEquals("Post does not exist.", result.message());
    }

    // deletePost

    // likePost

    // getComments

    // returnTotalLikes

    // doesUserLikeThisPost

    // getPostResponseDto

    // isValidToken

    // getUser


}