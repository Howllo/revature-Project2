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
        logger.info("The post object: {}", post);
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

    @PostMapping("/{id}/like/{userId}")
    public ResponseEntity<?> likePost(@PathVariable Long id,
                                           @PathVariable Long userId,
                                           @RequestHeader("Authorization") String token){
        if(id.equals(userId)){
            return ResponseEntity.badRequest().body("You are not allowed to like your own post.");
        }

        PostEnum result = postService.likePost(id, userId, token.substring(7));
        return ResponseHandler.returnType(result, null);
    }

    @GetMapping("{id}/likes")
    public ResponseEntity<Long> returnTotalLikes(@PathVariable Long id){
        Long result = postService.returnTotalLikes(id);
        if(result == null){
            return ResponseEntity.badRequest().body(-1L);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("{id}/comments/total")
    public ResponseEntity<Long> returnTotalComments(@PathVariable Long id){
        Long result = postService.returnTotalComments(id);
        if(result == null){
            return ResponseEntity.badRequest().body(-1L);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/check/{postId}/like/{user}")
    public ResponseEntity<?> checkLike(@PathVariable Long postId,
                                       @PathVariable Long user,
                                       @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(postService.doesUserLikeThisPost(postId, user, token.substring(7)));
    }
}

