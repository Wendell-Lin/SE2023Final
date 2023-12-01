package com.feastforward.payload.request;

import lombok.Data;

@Data
public class UpdateUserFollowItemRequest {
    private Long itemId;
    private Boolean follow;
}
