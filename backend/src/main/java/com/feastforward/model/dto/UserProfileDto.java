package com.feastforward.model.dto;

import lombok.Data;

@Data
public class UserProfileDto {
    private String username;
    private String email;
    private Boolean notifOn;
    private String image;
}
