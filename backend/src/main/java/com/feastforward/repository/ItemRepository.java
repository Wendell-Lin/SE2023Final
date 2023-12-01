package com.feastforward.repository;

import java.util.Optional;
import java.util.List;
import java.util.Date;

import com.feastforward.model.Item;
import com.feastforward.model.User;
import com.feastforward.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findById(Long id);

    List<Item> findByCreator(User creator);

    List<Item> findByCategory(Category category);

    List<Item> findByEndTimeGreaterThan(Date endTime);

    @Query("SELECT COUNT(follower) FROM Item item JOIN item.followers follower WHERE item.id = :itemId")
    int countFollowersByItemId(@Param("itemId") Long itemId);
}
