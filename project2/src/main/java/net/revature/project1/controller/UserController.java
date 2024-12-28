package net.revature.project1.controller;

import net.revature.project1.dto.EmailData;
import net.revature.project1.dto.UserRequestPicDto;
import net.revature.project1.entity.AppUser;
import net.revature.project1.enumerator.UserEnum;
import net.revature.project1.result.UserResult;
import net.revature.project1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    // This would be rate limited.
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserDto(@PathVariable Long id){
        UserResult userResult = userService.getUser(id);
        return switch (userResult.getResult()){
            case SUCCESS -> ResponseEntity.ok(userResult.getUserDto());
            case BAD_USERNAME -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userResult.getMessage());
            case USERNAME_TAKEN -> ResponseEntity.status(HttpStatus.CONFLICT).body(userResult.getMessage());
            case EMAIL_ALREADY_EXISTS, USER_ALREADY_FRIENDS, USER_ALREADY_FOLLOWING, UNAUTHORIZED, INVALID_EMAIL_FORMAT,
                 UNKNOWN_USER, UNKNOWN -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(userResult.getMessage());
        };
    }

    // This would be rate limited.
    @GetMapping("/check/username/{username}")
    public ResponseEntity<String> checkUsername(@PathVariable String username) {
        boolean isNotAvailable = userService.existsByUsername(username);
        if(isNotAvailable){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This username is already taken.");
        }
        return ResponseEntity.ok("This username is available.");
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<String> updateUserEmail(@PathVariable Long id,
                                                  @RequestBody AppUser appUser) {
        UserEnum result = userService.updateEmail(id, appUser);
        return resultResponse(result);
    }

    @PostMapping("/check/email")
    public ResponseEntity<String> checkEmail(@RequestBody EmailData emailData) {
        boolean isNotAvailable = userService.existsByEmail(emailData.email());
        if(isNotAvailable){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This email is already taken.");
        }
        return ResponseEntity.ok("This email is available.");
    }

    @PutMapping("/{id}/username")
    public ResponseEntity<String> updateUsername(@PathVariable Long id,
                                                 @RequestBody AppUser appUser) {
        UserEnum result = userService.updateUsername(id, appUser);
        return resultResponse(result);
    }

    @PutMapping("/{id}/display_name")
    public ResponseEntity<String> updateDisplayName(@PathVariable Long id,
                                                    @RequestBody AppUser appUser) {
        UserEnum result = userService.updateDisplayName(id, appUser);
        return resultResponse(result);
    }

    @PutMapping("/{id}/biography")
    public ResponseEntity<String> updateBiography(@PathVariable Long id,
                                                  @RequestBody AppUser appUser) {
        UserEnum result = userService.updateBiography(id, appUser);
        return resultResponse(result);
    }

    @PostMapping("/{id}/follow/{user}")
    public ResponseEntity<String> followNewUser(@PathVariable("id") Long followerId,
                                                @PathVariable("user") Long followingId) {
        UserEnum result = userService.followUser(followerId, followingId);
        return resultResponse(result);
    }

    @DeleteMapping("/{id}/follow/{user}")
    public ResponseEntity<String> unfollowUser(@PathVariable("id") Long followerId,
                                               @PathVariable("user") Long followingId) {
        UserEnum result = userService.unfollowUser(followerId, followingId);
        return resultResponse(result);
    }

    @PutMapping("/{id}/profile-pics")
    public ResponseEntity<String> updateProfilePictures(@PathVariable Long id,
                                                        @RequestBody UserRequestPicDto responsePicDto){
        UserEnum result = userService.updateProfilePictures(id, responsePicDto);
        return resultResponse(result);
    }

    @PostMapping("/{id}/friend-request/{user}")
    public ResponseEntity<String> sendFriendRequest(@PathVariable("id") Long senderId,
                                                    @PathVariable("user") Long receiverId) {
        UserEnum result = userService.sendFriendRequest(senderId, receiverId);
        return resultResponse(result);
    }

    private ResponseEntity<String> resultResponse(UserEnum result){
        return switch (result){
            case SUCCESS -> ResponseEntity.ok("Successfully updated information.");
            case UNAUTHORIZED -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to do this.");
            case EMAIL_ALREADY_EXISTS -> ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use.");
            case BAD_USERNAME -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username does not meet requirements.");
            case USERNAME_TAKEN -> ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already taken.");
            case INVALID_EMAIL_FORMAT -> ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This email fails to follow" +
                    "the email standard.");
            case USER_ALREADY_FOLLOWING -> ResponseEntity.status(HttpStatus.CONFLICT).body("You are already following" +
                    "this person.");
            case USER_ALREADY_FRIENDS -> ResponseEntity.status(HttpStatus.CONFLICT).body("You are already friends with " +
                    "this person.");
            case UNKNOWN, UNKNOWN_USER -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server" +
                    " Error - An unexpected error occurred on the server. Please try again later");
        };
    }
}
