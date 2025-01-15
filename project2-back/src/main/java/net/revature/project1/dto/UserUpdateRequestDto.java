package net.revature.project1.dto;

import jakarta.annotation.Nullable;
import org.springframework.web.multipart.MultipartFile;

public record UserUpdateRequestDto(Long id, String displayName, @Nullable MultipartFile profilePic,
                                   @Nullable  MultipartFile bannerPic, String biography ) { }
