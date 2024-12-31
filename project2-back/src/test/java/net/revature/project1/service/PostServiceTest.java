package net.revature.project1.service;

import net.revature.project1.dto.PostFeedRequest;
import net.revature.project1.dto.PostFeedResponse;
import net.revature.project1.dto.PostResponseDto;
import net.revature.project1.dto.PostSmallResponseDto;
import net.revature.project1.entity.AppUser;
import net.revature.project1.entity.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import net.revature.project1.repository.PostRepo;

import java.lang.reflect.Field;
import java.sql.Timestamp;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.util.ReflectionTestUtils.setField;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @InjectMocks
     private PostService service;

    @Mock
    private PostRepo dao;

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

        when(dao.findAll()).thenReturn(listOfPosts);
        setField(service, "postRepo", dao);

        // Act
        List<PostResponseDto> result = service.getAllPosts();

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

        when(dao.getUserPost(postId)).thenReturn(Optional.of(expectedPost));

        setField(service, "postRepo", dao);

        // Act
        PostSmallResponseDto actualPost = service.getPost(postId);

        // Assert
        assertEquals(expectedPost, actualPost, "The returned post should match the expected post.");
    }

    @Test
    void testGetPost_NotFound() {
        // Arrange
        Long postId = 2L;

        lenient().when(dao.getUserPost(postId)).thenReturn(Optional.empty());

        // Act
        PostSmallResponseDto actualPost = service.getPost(postId);

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
        when(dao.getFollowingPostsChunk(userId, lastPostId, chunkSize)).thenReturn(posts);

        setField(service, "postRepo", dao);

        // Creating PostFeedRequest
        List<Long> seenPostId = new ArrayList<>();
        PostFeedRequest request = new PostFeedRequest(userId, seenPostId, lastPostId);

        // Act
        PostFeedResponse response = service.getUserFeed(request, chunkSize);

        // Assert
        assertNotNull(response, "Response should not be null");

        // Extracting fields from the PostFeedResponse (since it's a record)
        List<Long> seenPostIds = response.seenPostId();


        // Verifying that the seenPostId list has the IDs of the posts
        assertTrue(seenPostIds.contains(1L), "Seen post ID list should contain post 1 ID");
        assertTrue(seenPostIds.contains(2L), "Seen post ID list should contain post 2 ID");
        assertFalse(seenPostIds.contains(3L), "Seen post ID list should not contain post 3 ID");

        // Verify the repository method was called with correct parameters
        verify(dao, times(1)).getFollowingPostsChunk(userId, lastPostId, chunkSize);
    }

    // Helper method to set the field via reflection (for private fields)
    private void setField(Object target, String fieldName, Object value) throws NoSuchFieldException, IllegalAccessException {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    // createPost

    // updatePost

    // deletePost

    // likePost

    // getComments

    // returnTotalLikes

    // doesUserLikeThisPost

    // getPostResponseDto

    // isValidToken

    // getUser
}