package com.feastforward.service;

import com.feastforward.model.Item;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    public Item createItem(CreateItemRequest itemRequest) {
        Item item = new Item();
        item.setName(itemRequest.getName());
        item.setCreatorId(itemRequest.getCreatorId());
        item.setCreatorId(itemRequest.getCreatorId());
        item.setCategoryId(itemRequest.getCategoryId());
        item.setLatitude(itemRequest.getLatitude());
        item.setLongitude(itemRequest.getLongitude());
        item.setQuantity(itemRequest.getQuantity());
        item.setStartTime(itemRequest.getStartTime());
        item.setEndTime(itemRequest.getEndTime());
        item.setDescription(itemRequest.getDescription());
        item.setNumberOfFollowers(itemRequest.getNumberOfFollowers());
        item.setImageList(itemRequest.getImageList());

        return itemRepository.save(item);
    }
}