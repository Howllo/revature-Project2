package net.revature.project1.service;

import net.revature.project1.dto.PostResponseDto;
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

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
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
    void testGetAllPosts() {
        // Arrange
        AppUser user = new AppUser("test@example.com", "testUser", "password123");
        user.setDisplayName("Test User");

        Post parentPost = new Post(user, "Parent Comment");
        parentPost.setPostEdited(false);
        parentPost.setMedia(null);
        parentPost.setPostAt(new Timestamp(System.currentTimeMillis()));

        Post childPost = new Post(user, "Child Comment");
        // Directly set the parentPost field using reflection since there is no setter
        setField(childPost, "postParent", parentPost);

        when(dao.findAll()).thenReturn(Arrays.asList(parentPost, childPost));

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

    // getPost

    // getUserFeed

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