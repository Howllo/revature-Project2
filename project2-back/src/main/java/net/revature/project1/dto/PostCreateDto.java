package net.revature.project1.dto;

public record PostCreateDto(Long postParent, Long userId, String comment, String media) { }
