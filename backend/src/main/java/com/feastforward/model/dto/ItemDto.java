package com.feastforward.model.dto;

import java.util.List;
import java.util.Date;

public class ItemDto {

    private Long id;
    private String name;
    private String creatorName;
    private String creatorEmail;
    private String location;
    private String categoryName;
    private double latitude;
    private double longitude;
    private Integer quantity;
    private String description;
    private Date startTime;
    private Date endTime;
    private Integer numberOfFollowers;
    private List<String> imageList;

    // Getters and Setters
    public Long getId() { 
        return id; 
    }

    public void setId(Long id) { 
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) { 
        this.name = name;
    }

    public String getCreatorName() { 
        return creatorName; 
    }

    public void setCreatorName(String creatorName) { 
        this.creatorName = creatorName; 
    }

    public String getCreatorEmail() { 
        return creatorEmail; 
    }

    public void setCreatorEmail(String creatorEmail) { 
        this.creatorEmail = creatorEmail; 
    }

    public String getLocation() { 
        return location; 
    }

    public void setLocation(String location) { 
        this.location = location; 
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) { 
        this.quantity = quantity; 
    }

    public String getDescription() { 
        return description; 
    }

    public void setDescription(String description) { 
        this.description = description; 
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

    public Integer getNumberOfFollowers() { 
        return numberOfFollowers; 
    }

    public void setNumberOfFollowers(int numberOfFollowers) { 
        this.numberOfFollowers = numberOfFollowers; 
    }

    public List<String> getImageList() { 
        return imageList; 
    }

    public void setImageList(List<String> imageList) { 
        this.imageList = imageList; 
    }
    
}
