package com.feastforward.payload.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserProfileRequest {
    @Size(max = 20)
    private String username;

    private Boolean notifOn = false;

    @Size(max = 255)
    private String image = null;
}
