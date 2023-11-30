package com.feastforward.controller;

import com.feastforward.model.Item;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.payload.response.MessageResponse;
import com.feastforward.repository.ItemRepository;
import com.feastforward.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemService ItemService;

    @PostMapping("/test")
    public String create(@RequestBody CreateItemRequest itemRequest) {
        System.out.println("itemRequest: " + itemRequest);
        System.out.println("itemRequest.getName(): " + itemRequest.getName());
        System.out.println("itemRequest.getCategoryId(): " + itemRequest.getCategoryId());
        System.out.println("itemRequest.getCreatorId(): " + itemRequest.getCreatorId());
        return "test";
    }

    @PostMapping("/createItem")
    public ResponseEntity<?> createItem(@RequestBody CreateItemRequest itemRequest) {
        try {
            Item _item = ItemService.createItem(itemRequest);
            return new ResponseEntity<>(_item, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating the item: " + e.getMessage());
        }
    }

    @GetMapping("/getItemDetail/{itemId}")
    public Item getItemDetail(@PathVariable(value = "itemId") Long itemId) {
        return itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Error: Item is not found."));
    }
}
