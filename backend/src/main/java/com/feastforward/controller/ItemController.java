package com.feastforward.controller;

import com.feastforward.model.Item;
import com.feastforward.model.dto.ItemDto;
import com.feastforward.model.dto.Mapper;
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
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemService ItemService;

    @Autowired
    Mapper mapper;

    @PostMapping("/test")
    public String create(@RequestBody CreateItemRequest itemRequest) {
        System.out.println("itemRequest: " + itemRequest);
        System.out.println("itemRequest.getName(): " + itemRequest.getName());
        System.out.println("itemRequest.getCategoryId(): " + itemRequest.getCategoryName());
        return "test";
    }

    @PostMapping("/createItem")
    public ResponseEntity<?> createItem(@RequestBody CreateItemRequest itemRequest) {
        try {
            Item _item = ItemService.createItem(itemRequest);
            ItemDto _itemDto = mapper.mapItemToItemDto(_item);
            return new ResponseEntity<>(_itemDto, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while creating the item: " + e.getMessage());
        }
    }

    @GetMapping("/getItems")
    public ResponseEntity<?> getItems() {
        try {
            List<ItemDto> itemDtos = ItemService.getNonExpiredItemList().stream()
                .map(mapper::mapItemToItemDto)
                .collect(Collectors.toList());
            
            return new ResponseEntity<>(itemDtos, HttpStatus.OK);
            // return new ResponseEntity<>(ItemService.getNonExpiredItemList(), HttpStatus.OK);
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
            ItemDto _itemDto = mapper.mapItemToItemDto(_item);
            return new ResponseEntity<>(_itemDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the item: " + e.getMessage());
        }
    }

    @GetMapping("/getItemDetail/{itemId}")
    public ResponseEntity<?> getItemDetail(@PathVariable(value = "itemId") Long itemId) {
        try {
            Optional<Item> item = itemRepository.findById(itemId);
            if (item.isEmpty()) {
                throw new RuntimeException("Error: Item is not found.");
            }
            ItemDto itemDto = mapper.mapItemToItemDto(item.get());
            return new ResponseEntity<>(itemDto, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while getting the item detail: " + e.getMessage());
        }
        // return itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Error: Item is not found."));
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
