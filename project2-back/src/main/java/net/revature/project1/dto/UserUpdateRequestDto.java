package net.revature.project1.dto;

import org.springframework.web.multipart.MultipartFile;

public record UserUpdateRequestDto(Long id, String displayName, MultipartFile profilePic,
                                   MultipartFile bannerPic, String biography ) {
}
