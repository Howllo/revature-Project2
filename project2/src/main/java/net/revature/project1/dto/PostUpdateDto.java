package net.revature.project1.dto;

import java.sql.Timestamp;

public record PostUpdateDto(int id, String comment, Timestamp postAt) {}
