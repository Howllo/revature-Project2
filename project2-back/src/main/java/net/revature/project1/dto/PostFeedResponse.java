package net.revature.project1.dto;

import net.revature.project1.entity.Post;

import java.util.List;

public record PostFeedResponse(List<Post> postToBeDisplay, List<Long> seenPostId) {}
