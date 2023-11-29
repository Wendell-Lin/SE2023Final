package com.feastforward.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.feastforward.validation.PasswordMatches;
import com.feastforward.validation.ValidEmail;
import com.feastforward.validation.ValidPassword;

@PasswordMatches
public class UserDto {

    @NotNull
    @Size(min = 1, message = "{Size.userDto.username}")
    private String username;

    @ValidPassword
    private String password;

    @NotNull
    @Size(min = 1)
    private String matchingPassword;

    @ValidEmail
    @NotNull
    @Size(min = 1, message = "{Size.userDto.email}")
    private String email;

    private boolean isUsing2FA;

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    private Integer role;

    public Integer getRole() {
        return role;
    }

    public void setRole(final Integer role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getMatchingPassword() {
        return matchingPassword;
    }

    public void setMatchingPassword(final String matchingPassword) {
        this.matchingPassword = matchingPassword;
    }

    public boolean isUsing2FA() {
        return isUsing2FA;
    }

    public void setUsing2FA(boolean isUsing2FA) {
        this.isUsing2FA = isUsing2FA;
    }

    @Override
    public String toString() {
        final StringBuilder builder = new StringBuilder();
        builder.append("UserDto [username=")
                .append(username)
                .append(", email=")
                .append(email)
                .append(", isUsing2FA=")
                .append(isUsing2FA)
                .append(", role=")
                .append(role).append("]");
        return builder.toString();
    }

}