package com.feastforward.unit.controller;

import com.feastforward.FeastForwardApplication;
import com.feastforward.controller.ItemController;
import com.feastforward.model.Item;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.junit.runner.RunWith;

@RunWith(SpringRunner.class)
@WebMvcTest(ItemController.class)
public class ItemControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ItemController itemController;

    @Test
    @DisplayName("Test Mock ItemController")
    public void createItemTest() throws Exception {
        
    }

    @Test
    @DisplayName("Test Mock ItemController")
    public void getItemsTest() throws Exception {
        Item item = new Item();
        item.setName("test");
        item.setCreatorId(1L);
        item.setQuantity(1);
        
        // List allItems = singletonList(item);

        // given(itemController.getItemDetail()).willReturn(allItems);
    }

}