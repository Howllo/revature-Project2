package net.revature.project1.result;

import net.revature.project1.dto.PostResponseDto;
import net.revature.project1.entity.Post;
import net.revature.project1.enumerator.PostEnum;

public record PostResult(PostEnum postEnum, String message, PostResponseDto post) {
}
