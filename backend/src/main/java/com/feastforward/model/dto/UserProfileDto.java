package com.feastforward.model.dto;

import lombok.Data;

@Data
public class UserProfileDto {
    private String name;
    private String email;
    private Boolean notification;
    private String userImg;
}
