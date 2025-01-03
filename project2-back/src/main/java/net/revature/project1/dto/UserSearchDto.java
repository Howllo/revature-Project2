package net.revature.project1.dto;

public record UserSearchDto(String username, String displayName, String profilePic, String bannerPic, String biography,
                      Integer followerCount, Integer followingCount) { }
