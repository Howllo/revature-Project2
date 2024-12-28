package net.revature.project1.dto;

import java.util.List;

public record PostFeedRequest(Long userId, List<Long> seenPostId, Long lastPostId) {}
