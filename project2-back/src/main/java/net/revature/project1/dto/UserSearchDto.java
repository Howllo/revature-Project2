package net.revature.project1.dto;

public record UserSearchDto(Long id, String username, String displayName, String profilePic, String bannerPic, String biography,
                      Integer followerCount, Integer followingCount) { }
