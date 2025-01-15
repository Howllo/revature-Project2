package net.revature.project1.dto;

import jakarta.annotation.Nullable;
import org.springframework.web.multipart.MultipartFile;

public record PostCreateRequestDto(Long userId, @Nullable Long postParent, String comment, @Nullable MultipartFile media) { }
