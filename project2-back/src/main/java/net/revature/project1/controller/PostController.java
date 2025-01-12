package net.revature.project1.controller;

import net.revature.project1.dto.*;
import net.revature.project1.enumerator.PostEnum;
import net.revature.project1.result.PostResult;
import net.revature.project1.service.PostService;
import net.revature.project1.utils.ResponseHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/post")
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);
    final private PostService postService;
    final Integer CHUNK_SIZE = 100;

    @Autowired
    private PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostResponseDto>> getAll(){
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostSmallResponseDto> getPost(@PathVariable Long id){
        return ResponseEntity.ok(postService.getPost(id));
    }

    @GetMapping("/{id}/feed")
    public ResponseEntity<PostFeedResponse> getUserFeed(@PathVariable Long id,
                                                        @RequestBody PostFeedRequest postFeedRequest){
        return ResponseEntity.ok(postService.getUserFeed(postFeedRequest, CHUNK_SIZE));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<PostResponseDto>> getComments(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getComments(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody PostCreateDto post,
                                        @RequestHeader("Authorization") String token){
        if(post == null){
            return ResponseEntity.badRequest().body("Invalid post");
        }

        PostResult postResult = postService.createPost(post, token.substring(7));
        PostEnum result = postResult.postEnum();
        return ResponseHandler.returnType(result, postResult.post());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody PostUpdateDto post,
                                        @RequestHeader("Authorization") String token){
        PostResult postResult = postService.updatePost(id, post, token.substring(7));
        PostEnum result = postResult.postEnum();
        return ResponseHandler.returnType(result, postResult.post());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id,
                                             @RequestHeader("Authorization") String token){
        PostEnum result = postService.deletePost(id, token.substring(7));
        return ResponseHandler.returnType(result, null);
    }

    @PostMapping("/{postId}/like/{userId}")
    public ResponseEntity<?> likePost(@PathVariable Long postId,
                                           @PathVariable Long userId,
                                           @RequestHeader("Authorization") String token){
        PostEnum result = postService.likePost(postId, userId, token.substring(7));
        return ResponseHandler.returnType(result, null);
    }

    @GetMapping("/check/{postId}/like/{user}")
    public ResponseEntity<?> checkLike(@PathVariable Long postId,
                                       @PathVariable Long user,
                                       @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(postService.doesUserLikeThisPost(postId, user, token.substring(7)));
    }
}

