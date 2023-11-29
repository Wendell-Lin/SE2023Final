package com.feastforward.repository;

import java.util.Optional;
import java.util.List;
import java.util.Date;

import com.feastforward.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findById(Long id);

    List<Item> findByCreatorId(Long creatorId);

    List<Item> findByCategoryId(Long categoryId);

    List<Item> findByEndTimeGreaterThan(Date endTime);

}
