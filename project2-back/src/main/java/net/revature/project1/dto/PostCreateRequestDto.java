package net.revature.project1.dto;

import org.springframework.web.multipart.MultipartFile;

public record PostCreateRequestDto(Long postParent, Long userId, String comment, MultipartFile media) { }
