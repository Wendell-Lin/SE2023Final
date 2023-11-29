package com.feastforward.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.BatchSize;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "items")
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message= "item name may not be empty")
    @Size(max = 50)
    private String name;

    @Column(name = "creator_id", nullable = false)
    @NotNull(message= "creator id may not be empty")
    private Integer creatorId;

    @Column(name = "category_id", nullable = true)
    private Integer categoryId;

    @Column(name = "latitude", nullable = false)
    @NotNull(message= "latitude may not be empty")
    private double latitude;

    @Column(name = "longitude", nullable = false)
    @NotNull(message= "longitude may not be empty")
    private double longitude;

    @Column(name = "quantity", nullable = false)
    @NotNull(message= "quantity may not be empty")
    private double quantity;

    @Column(name = "start_time", nullable = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date startTime;

    @Column(name = "end_time", nullable = false)
    @NotNull(message= "end time may not be empty")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date endTime;

    @Column(name = "description", nullable = true)
    @Size(max = 200)
    private String description;

    @Column(name = "number_of_followers", nullable = true)
    private Integer numberOfFollowers;

    @Column(name = "image_list", nullable = true)
    @Size(max = 10)
    @BatchSize(size = 100)
    private List<String> imageList = new ArrayList<>();

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(int creatorId) {
        this.creatorId = creatorId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public int getNumberOfFollowers() {
        return numberOfFollowers;
    }

    public void setNumberOfFollowers(int numberOfFollowers) {
        this.numberOfFollowers = numberOfFollowers;
    }

    public List<String> getImageList() {
        return imageList;
    }

    public void setImageList(List<String> imageList) { this.imageList = imageList; }

    public void addImage(String image) { this.imageList.add(image); }

    public void removeImage(String image) { this.imageList.remove(image); }

    public void clearImages() { this.imageList.clear(); }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}