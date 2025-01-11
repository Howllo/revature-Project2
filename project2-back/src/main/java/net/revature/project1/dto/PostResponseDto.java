package net.revature.project1.dto;

import java.sql.Timestamp;

public record PostResponseDto(Long id, Long parentPost, Long userId, String username, String displayName,
                              String comment, String media, Boolean postEdit, Timestamp postAt,
                              Long likeCount, Long commentCount) {
}
