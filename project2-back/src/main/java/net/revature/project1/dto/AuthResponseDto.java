package net.revature.project1.dto;

public class AuthResponseDto {
    public String message;
    public String username;
    public Long userId;
    public String displayName;
    public String profilePicture;
    public String token;

    public AuthResponseDto(String message, Long userId, String username, String displayName, String profilePicture, String token) {
        this.message = message;
        this.username = username;
        this.userId = userId;
        this.displayName = displayName;
        this.profilePicture = profilePicture;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return userId;
    }
}
