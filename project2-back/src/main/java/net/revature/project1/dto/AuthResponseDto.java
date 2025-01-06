package net.revature.project1.dto;

public record AuthResponseDto (String message, Long userId, String username, String displayName, String profilePicture,
                               String bannerPicture, String token) {}

