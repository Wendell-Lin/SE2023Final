package com.feastforward.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.feastforward.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    List<User> findByIdIn(List<Long> userIds);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query("SELECT COUNT(followedItem) FROM User u JOIN u.followedItems followedItem WHERE u.id = :userId")
    long countFollowedItemsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(createdItem) FROM User u JOIN u.createdItems createdItem WHERE u.id = :userId")
    long countCreatedItemsByUserId(@Param("userId") Long userId);
}
