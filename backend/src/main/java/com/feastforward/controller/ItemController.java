package com.feastforward.controller;

import com.feastforward.model.Item;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.payload.request.UpdateItemRequest;
import com.feastforward.payload.response.GenericResponse;
import com.feastforward.repository.ItemRepository;
import com.feastforward.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;


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
        System.out.println("itemRequest.getCategoryId(): " + itemRequest.getCategoryName());
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

    @GetMapping("/getItems")
    public ResponseEntity<?> getItems() {
        try {
            return new ResponseEntity<>(ItemService.getNonExpiredItemList(), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while getting the items: " + e.getMessage());
        }
    }

    @PutMapping("/updateItem/{itemId}")
    public ResponseEntity<?> updateItem(@PathVariable(value = "itemId") Long itemId, @RequestBody UpdateItemRequest itemRequest) {
        try {
            Optional<Item> item = itemRepository.findById(itemId);
            if (item.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Item _item = ItemService.updateItem(itemId, itemRequest);
            return new ResponseEntity<>(_item, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the item: " + e.getMessage());
        }
    }

    @GetMapping("/getItemDetail/{itemId}")
    public Item getItemDetail(@PathVariable(value = "itemId") Long itemId) {
        return itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Error: Item is not found."));
    }

    @DeleteMapping("/deleteItem/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable(value = "itemId") Long itemId) {
        try {
            Optional<Item> item = itemRepository.findById(itemId);
            if (item.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            itemRepository.deleteById(itemId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the item: " + e.getMessage());
        }
    }
}
