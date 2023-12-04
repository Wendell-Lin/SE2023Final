package com.feastforward.controller;

import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.feastforward.security.jwt.JwtUtils;
// import com.google.api.Authentication;
import com.feastforward.model.User;
import com.feastforward.model.Item;
import com.feastforward.model.Category;
import com.feastforward.repository.ItemRepository;
import com.feastforward.repository.UserRepository;
import com.feastforward.repository.CategoryRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.payload.request.UpdateItemRequest;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Optional;
import java.util.List;
import java.util.Date;
import java.util.stream.Collectors;


@SpringBootTest
@AutoConfigureMockMvc
public class ItemControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    public Long itemId;

    public String token;

    @BeforeEach
    public void setUp() {
        User user = new User();
        user.setUsername("itemUser");
        user.setEmail("itemUser@example.com");
        user.setPassword(encoder.encode("password"));
        userRepository.save(user);

        // Generate token
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getUsername(), "password"));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        token = jwtUtils.generateJwtToken(authentication);

        Category category = new Category();
        category.setName("food");
        categoryRepository.save(category);

        Item item = new Item();
        item.setName("test item");
        item.setCategory(category);
        item.setCreator(user);
        item.setLatitude(121.554);
        item.setLongitude(25.33);
        item.setQuantity(20);
        item.setLocation("Library");
        item.setStartTime(Date.from(java.time.Instant.parse("2021-11-23T13:00:00.000Z")));
        item.setEndTime(Date.from(java.time.Instant.parse("2023-12-23T14:00:00.000Z")));
        item.setDescription("test description");
        item.setImageList(List.of("test1", "test2"));
        Item itemCreated = itemRepository.save(item);
        itemId = itemCreated.getId();
    }

    @AfterEach
    public void tearDown() {
        userRepository.deleteAll();
        categoryRepository.deleteAll();
        itemRepository.deleteAll();
    }

    @Test
    public void testCreateItem() throws Exception {
        CreateItemRequest createItemRequest = new CreateItemRequest();
        createItemRequest.setName("test create");
        createItemRequest.setCategoryName("fruit");
        createItemRequest.setLatitude(122.554);
        createItemRequest.setLongitude(24.33);
        createItemRequest.setQuantity(15);
        createItemRequest.setLocation("Park");
        createItemRequest.setStartTime(Date.from(java.time.Instant.parse("2021-11-23T13:00:00.000Z")));
        createItemRequest.setEndTime(Date.from(java.time.Instant.parse("2023-12-23T14:00:00.000Z")));
        createItemRequest.setDescription("test description create");
        createItemRequest.setImageList(List.of("testCreate1", "testCreate2"));
        mockMvc.perform(post("/api/items/createItem")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token)
                .content(objectMapper.writeValueAsString(createItemRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("test create"));
    }

    @Test
    public void testGetItems() throws Exception {
        mockMvc.perform(get("/api/items/getItems")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetItemDetail() throws Exception {
        mockMvc.perform(get("/api/items/getItemDetail/" + itemId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test item"));
    }

    @Test
    public void testGetItemDetailNotFound() throws Exception {
        mockMvc.perform(get("/api/items/getItemDetail/" + (itemId + 10))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetItemDetailBadRequest() throws Exception {
        mockMvc.perform(get("/api/items/getItemDetail/abc")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testUpdateItem() throws Exception {
        UpdateItemRequest updateItemRequest = new UpdateItemRequest();
        updateItemRequest.setName("test update");
        updateItemRequest.setCategoryName("fruit");
        updateItemRequest.setLatitude(122.554);
        updateItemRequest.setLongitude(24.33);
        updateItemRequest.setQuantity(10);
        updateItemRequest.setLocation("Park");
        updateItemRequest.setStartTime(Date.from(java.time.Instant.parse("2021-11-23T13:00:00.000Z")));
        updateItemRequest.setEndTime(Date.from(java.time.Instant.parse("2023-12-23T14:00:00.000Z")));
        updateItemRequest.setDescription("new test description");
        updateItemRequest.setImageList(List.of("test3", "test4"));
        mockMvc.perform(put("/api/items/updateItem/" + itemId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateItemRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("test update"));
    }

    @Test
    public void testUpdateItemNotFound() throws Exception {
        UpdateItemRequest updateItemRequest = new UpdateItemRequest();
        updateItemRequest.setName("test");
        updateItemRequest.setCategoryName("fruit");
        updateItemRequest.setLatitude(122.554);
        updateItemRequest.setLongitude(24.33);
        updateItemRequest.setQuantity(10);
        updateItemRequest.setLocation("Park");
        updateItemRequest.setStartTime(Date.from(java.time.Instant.parse("2021-11-23T13:00:00.000Z")));
        updateItemRequest.setEndTime(Date.from(java.time.Instant.parse("2023-12-23T14:00:00.000Z")));
        updateItemRequest.setDescription("new test description");
        updateItemRequest.setImageList(List.of("test3", "test4"));
        mockMvc.perform(put("/api/items/updateItem/" + (itemId + 10))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateItemRequest)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateItemBadRequest() throws Exception {
        UpdateItemRequest updateItemRequest = new UpdateItemRequest();
        updateItemRequest.setName("test");
        updateItemRequest.setCategoryName("fruit");
        updateItemRequest.setLatitude(122.554);
        updateItemRequest.setLongitude(24.33);
        updateItemRequest.setQuantity(10);
        updateItemRequest.setLocation("Park");
        updateItemRequest.setStartTime(Date.from(java.time.Instant.parse("2021-11-23T13:00:00.000Z")));
        updateItemRequest.setEndTime(Date.from(java.time.Instant.parse("2023-12-23T14:00:00.000Z")));
        updateItemRequest.setDescription("new test description");
        updateItemRequest.setImageList(List.of("test3", "test4"));
        mockMvc.perform(put("/api/items/updateItem/abc")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateItemRequest)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteItem() throws Exception {
        mockMvc.perform(delete("/api/items/deleteItem/" + itemId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteItemNotFound() throws Exception {
        mockMvc.perform(delete("/api/items/deleteItem/" + (itemId + 10))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteItemBadRequest() throws Exception {
        mockMvc.perform(delete("/api/items/deleteItem/abc")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

}
