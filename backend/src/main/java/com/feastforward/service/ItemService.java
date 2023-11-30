package com.feastforward.service;

import com.feastforward.model.Item;
import com.feastforward.model.User;
import com.feastforward.model.Category;
import com.feastforward.payload.request.CreateItemRequest;
import com.feastforward.payload.request.UpdateItemRequest;
import com.feastforward.repository.CategoryRepository;
import com.feastforward.repository.ItemRepository;
import com.feastforward.service.FileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;

import org.apache.commons.lang3.RandomStringUtils;


@Service
public class ItemService {

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    FileService fileService;

    @Autowired
    UserService userService;

    public void incrementNumberOfFollowers(long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Error: Item is not found."));
        item.incrementNumberOfFollowers();
        itemRepository.save(item);
    }

    public void decrementNumberOfFollowers(long itemId) {
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Error: Item is not found."));
        item.decrementNumberOfFollowers();
        itemRepository.save(item);
    }

    public Item createItem(CreateItemRequest itemRequest) {

        User creator = userService.getCurrentUser();

        String categoryName = itemRequest.getCategoryName();
        Optional<Category> existingCategory = categoryRepository.findByName(categoryName);

        Category category = existingCategory.orElseGet(() -> {
            Category newCategory = new Category();
            newCategory.setName(categoryName);
            return categoryRepository.save(newCategory);
        });

        // Generate image name
        List<String> imageNames = new ArrayList<String>();
        // Upload image to GCP
        for (String base64String : itemRequest.getImageList()) {
            String imageName = Instant.now().getEpochSecond() + RandomStringUtils.randomAlphanumeric(10);
            
            imageNames.add(imageName);
            try {
                fileService.uploadFile(base64String, imageName);
            } catch (Exception e) {
                throw new RuntimeException("Error: Image upload failed.");
            }
        }

        Item item = new Item();
        item.setName(itemRequest.getName());
        item.setCreator(creator);
        item.setCategory(category);
        item.setLocation(itemRequest.getLocation());
        item.setLatitude(itemRequest.getLatitude());
        item.setLongitude(itemRequest.getLongitude());
        item.setQuantity(itemRequest.getQuantity());
        item.setStartTime(itemRequest.getStartTime());
        item.setEndTime(itemRequest.getEndTime());
        item.setDescription(itemRequest.getDescription());
        item.setNumberOfFollowers(0);
        item.setImageList(imageNames);

        return itemRepository.save(item);
    }

    // RequestBody is the same with createItem
    public Item updateItem(long itemId, UpdateItemRequest itemRequest) {
        String categoryName = itemRequest.getCategoryName();
        Optional<Category> existingCategory = categoryRepository.findByName(categoryName);

        Category category = existingCategory.orElseGet(() -> {
            Category newCategory = new Category();
            newCategory.setName(categoryName);
            return categoryRepository.save(newCategory);
        });

        // Generate image name
        List<String> imageNames = new ArrayList<String>();
        // Upload image to GCP
        for (String base64String : itemRequest.getImageList()) {
            String imageName = Instant.now().getEpochSecond() + RandomStringUtils.randomAlphanumeric(10);
            imageNames.add(imageName);
            try {
                fileService.uploadFile(base64String, imageName);
            } catch (Exception e) {
                throw new RuntimeException("Error: Image upload failed.");
            }
        }
        
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Error: Item is not found."));
        item.setName(itemRequest.getName());
        item.setCategory(category);
        item.setLocation(itemRequest.getLocation());
        item.setLatitude(itemRequest.getLatitude());
        item.setLongitude(itemRequest.getLongitude());
        item.setQuantity(itemRequest.getQuantity());
        item.setStartTime(itemRequest.getStartTime());
        item.setEndTime(itemRequest.getEndTime());
        item.setDescription(itemRequest.getDescription());
        item.setImageList(imageNames);

        // return itemRepository.update(item);
        return itemRepository.save(item);
    }

    public void deleteItem(long itemId) {
        itemRepository.deleteById(itemId);
    }

    public List<Item> getNonExpiredItemList() {
        Date currentTime = new Date();
        List<Item> nonExpiredItemList = itemRepository.findByEndTimeGreaterThan(currentTime);
        
        // Get image from GCP
        for (Item item : nonExpiredItemList) {
            List<String> imageList = item.getImageList();
            List<String> base64ImageList = new ArrayList<String>();
            for (String imageName : imageList) {
                String base64Image = fileService.getFile(imageName);
                base64ImageList.add(base64Image);
                // try {
                //     byte[] imageByteArray = fileService.getFile(imageName).getByteArray();
                //     String base64Image = java.util.Base64.getEncoder().encodeToString(imageByteArray);
                //     base64ImageList.add(base64Image);
                // } catch (Exception e) {
                //     throw new RuntimeException("Error: Image download failed.");
                // }
            }
            item.setImageList(base64ImageList);
        }

        return nonExpiredItemList;
        // return itemRepository.findByEndTimeGreaterThan(currentTime);
        // return nonExpiredItemList.stream().map(item -> mapper.mapItemToItemDto(item)).collect(Collectors.toList());
    }
}
