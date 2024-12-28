package net.revature.project1.dto;

import net.revature.project1.enumerator.FileType;
import net.revature.project1.enumerator.PicUploadType;

public record UserRequestPicDto(FileType fileType, String picturePath, String fileName, PicUploadType picUploadType) { }
