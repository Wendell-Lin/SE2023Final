package com.feastforward.payload.response;

import java.util.List;

import com.feastforward.model.dto.ItemDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemsResponse {
    private List<ItemDto> items;
    private String message;
}
