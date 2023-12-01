package com.feastforward.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.feastforward.model.Item;
import com.feastforward.model.User;
import com.feastforward.repository.ItemRepository;
import com.feastforward.repository.UserRepository;

@Service
public class FollowService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    public void followItem(Long userId, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new IllegalArgumentException("Item not found"));

        if (!user.getFollowedItems().contains(item)) {
            user.getFollowedItems().add(item);
            item.getFollowers().add(user);
            userRepository.save(user);
        }
    }

    public void unfollowItem(Long userId, Long itemId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Item item = itemRepository.findById(itemId).orElseThrow(() -> new IllegalArgumentException("Item not found"));

        if (user.getFollowedItems().contains(item)) {
            user.getFollowedItems().remove(item);
            item.getFollowers().remove(user);
            userRepository.save(user);
        }
    }
}
