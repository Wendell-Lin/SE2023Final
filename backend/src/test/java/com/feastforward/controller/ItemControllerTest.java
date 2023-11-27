package com.feastforward.controller;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feastforward.model.Item;
import com.feastforward.repository.ItemRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.payload.request.UpdateItemRequest;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@SpringBootTest
@AutoConfigureMockMvc
public class ItemControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ItemRepository itemRepository;

    @BeforeEach
    public void setUp() {
        Item item = new Item();
        item.setName("test");
        item.setCategoryId(1);
        item.setCreatorId(1);
        itemRepository.save(item);
    }

    @AfterEach
    public void tearDown() {
        itemRepository.deleteAll();
    }

    @Test
    public void testCreateItem() throws Exception {
        CreateItemRequest createItemRequest = new CreateItemRequest();
        createItemRequest.setName("test");
        createItemRequest.setCategoryId(1);
        createItemRequest.setCreatorId(1);
        mockMvc.perform(post("/api/items/createItem")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createItemRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(jsonPath("$.categoryId").value(1))
                .andExpect(jsonPath("$.creatorId").value(1));
    }

    @Test
    public void testGetItemDetail() throws Exception {
        mockMvc.perform(post("/api/items/getItemDetail/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(jsonPath("$.categoryId").value(1))
                .andExpect(jsonPath("$.creatorId").value(1));
    }

    @Test
    public void testGetItemDetailNotFound() throws Exception {
        mockMvc.perform(post("/api/items/getItemDetail/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetItemDetailBadRequest() throws Exception {
        mockMvc.perform(post("/api/items/getItemDetail/abc")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testUpdateItem() throws Exception {
        UpdateItemRequest updateItemRequest = new UpdateItemRequest();
        updateItemRequest.setName("test");
        updateItemRequest.setCategoryId(1);
        updateItemRequest.setCreatorId(1);
        mockMvc.perform(post("/api/items/updateItem/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateItemRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(jsonPath("$.categoryId").value(1))
                .andExpect(jsonPath("$.creatorId").value(1));
    }

    @Test
    public void testUpdateItemNotFound() throws Exception {
        UpdateItemRequest updateItemRequest = new UpdateItemRequest();
        updateItemRequest.setName("test");
        updateItemRequest.setCategoryId(1);
        updateItemRequest.setCreatorId(1);
        mockMvc.perform(post("/api/items/updateItem/10")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateItemRequest)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateItemBadRequest() throws Exception {
        UpdateItemRequest updateItemRequest = new UpdateItemRequest();
        updateItemRequest.setName("test");
        updateItemRequest.setCategoryId(1);
        updateItemRequest.setCreatorId(1);
        mockMvc.perform(post("/api/items/updateItem/abc")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateItemRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteItem() throws Exception {
        mockMvc.perform(post("/api/items/deleteItem/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteItemNotFound() throws Exception {
        mockMvc.perform(post("/api/items/deleteItem/10")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteItemBadRequest() throws Exception {
        mockMvc.perform(post("/api/items/deleteItem/abc")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

}
