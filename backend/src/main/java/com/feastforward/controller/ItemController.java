package com.feastforward.controller;

import com.feastforward.model.Item;
import com.feastforward.model.User;
import com.feastforward.model.dto.ItemDto;
import com.feastforward.model.dto.Mapper;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.payload.request.UpdateItemRequest;
import com.feastforward.payload.response.GenericResponse;
import com.feastforward.repository.ItemRepository;
import com.feastforward.service.ItemService;
import com.google.api.gax.rpc.UnauthenticatedException;

import aj.org.objectweb.asm.Type;
import autovalue.shaded.kotlinx.metadata.internal.metadata.jvm.deserialization.JvmMemberSignature.Method;

import org.hibernate.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.Optional;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    ItemService itemService;

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
            Item _item = itemService.createItem(itemRequest);
            ItemDto _itemDto = mapper.mapItemToItemDto(_item);
            return new ResponseEntity<>(_itemDto, HttpStatus.CREATED);
        }
        catch (Exception e) {
            // check if e message is user not authenticated
            if (e.getMessage().equals("User is not authenticated")) {
                return new ResponseEntity<>(new GenericResponse("User is not authenticated"), HttpStatus.UNAUTHORIZED);
            }
            throw new RuntimeException("An error occurred while creating the item: " + e.getMessage());
        }
    }

    @GetMapping("/getItems")
    public ResponseEntity<?> getItems() {
        try {
            Date currentTime = new Date();
            List<ItemDto> itemDtos = itemRepository
                .findByEndTimeGreaterThan(currentTime)
                .stream()
                .map(mapper::mapItemToItemDto)
                .collect(Collectors.toList());
            
            return new ResponseEntity<>(itemDtos, HttpStatus.OK);
            // return new ResponseEntity<>(ItemService.getNonExpiredItemList(), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while getting the items: " + e.getMessage());
        }
    }

    @PutMapping("/updateItem/{itemId}")
    public ResponseEntity<?> updateItem(@PathVariable(value = "itemId") String itemId, @RequestBody UpdateItemRequest itemRequest) {
        try {
            // Convert String to Long
            Long itemIdLong = Long.parseLong(itemId);
            Optional<Item> item = itemRepository.findById(itemIdLong);
            if (item.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Item _item = itemService.updateItem(itemIdLong, itemRequest);
            ItemDto _itemDto = mapper.mapItemToItemDto(_item);
            return new ResponseEntity<>(_itemDto, HttpStatus.OK);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("Error: Item ID is not a number.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while updating the item: " + e.getMessage());
        }
    }

    @GetMapping("/getItemDetail/{itemId}")
    public ResponseEntity<?> getItemDetail(@PathVariable(value = "itemId") String itemId) {
        try {
            // Convert String to Long
            Long itemIdLong = Long.parseLong(itemId);
            Optional<Item> item = itemRepository.findById(itemIdLong);
            if (item.isEmpty()) {
                // throw new RuntimeException("Error: Item is not found.");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            ItemDto itemDto = mapper.mapItemToItemDto(item.get());
            return new ResponseEntity<>(itemDto, HttpStatus.OK);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("Error: Item ID is not a number.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while getting the item detail: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteItem/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable(value = "itemId") String itemId) {
        try {
            // Convert String to Long
            Long itemIdLong = Long.parseLong(itemId);
            Optional<Item> item = itemRepository.findById(itemIdLong);
            if (item.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            itemService.deleteItem(item.get());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("Error: Item ID is not a number.");
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while deleting the item: " + e.getMessage());
        }
    }
}
