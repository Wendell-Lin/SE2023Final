package com.feastforward.model.dto;

import com.feastforward.model.Item;

import org.springframework.stereotype.Component;

@Component
public class Mapper {
    public ItemDto mapItemToItemDto(Item item) {
        ItemDto itemDto = new ItemDto();
        itemDto.setId(item.getId());
        itemDto.setName(item.getName());
        itemDto.setCreatorName(item.getCreator().getUsername());
        itemDto.setCreatorEmail(item.getCreator().getEmail());
        itemDto.setLocation(item.getLocation());
        itemDto.setCategoryName(item.getCategory().getName());
        itemDto.setLatitude(item.getLatitude());
        itemDto.setLongitude(item.getLongitude());
        itemDto.setQuantity(item.getQuantity());
        itemDto.setDescription(item.getDescription());
        itemDto.setStartTime(item.getStartTime());
        itemDto.setEndTime(item.getEndTime());
        itemDto.setNumberOfFollowers(item.getNumberOfFollowers());
        itemDto.setImageList(item.getImageList());
        return itemDto;
    }
}
