package net.revature.project1.dto;

import org.springframework.web.multipart.MultipartFile;

public record PostCreateRequestDto(Long userId, Long postParent, String comment, MultipartFile media) { }
