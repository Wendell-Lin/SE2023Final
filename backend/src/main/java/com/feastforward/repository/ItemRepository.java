package com.feastforward.repository;

import java.util.Optional;
import java.util.List;
import java.util.Date;

import com.feastforward.model.Item;
import com.feastforward.model.User;
import com.feastforward.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findById(Long id);

    List<Item> findByCreator(User creator);

    List<Item> findByCategory(Category category);

    List<Item> findByEndTimeGreaterThan(Date endTime);

}
