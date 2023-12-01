package com.feastforward.model.dto;

import com.feastforward.model.Item;
import com.feastforward.model.User;
import com.feastforward.repository.ItemRepository;
import com.feastforward.service.FileService;
import com.feastforward.service.ItemService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Mapper {
    @Autowired
    FileService fileService;

    @Autowired
    ItemService itemService;

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
        itemDto.setNumberOfFollowers(itemService.countFollowersByItemId(item.getId()));
        itemDto.setImageList(item.getImageList());
        return itemDto;
    }

    public UserProfileDto mapUserToUserProfileDto(User user){
        UserProfileDto userProfileDto = new UserProfileDto();
        // normal properties
        userProfileDto.setUsername(user.getUsername());
        userProfileDto.setEmail(user.getEmail());
        userProfileDto.setNotifOn(user.getNotifOn());
        // image
        String base64String = null;
        String imageName = user.getImageName();
        if (imageName != null){
            try {
                base64String = fileService.getFile(imageName);
            }catch (Exception e){
                throw new RuntimeException("Error: Image retrieval failed.");
            }
        }
        userProfileDto.setImage(base64String);
        return userProfileDto;
    }
}
