package com.feastforward.payload.request;

import jakarta.validation.constraints.Size;

public class UpdateUserProfileRequest {
    @Size(max = 20)
    private String username;

    private Boolean notification = false;

    @Size(max = 255)
    private String userImg = null;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getNotification() {
        return notification;
    }

    public void setNotification(Boolean notification) {
        this.notification = notification;
    }

    public String getUserImg() {
        return userImg;
    }

    public void setUserImg(String userImg) {
        this.userImg = userImg;
    }
}
