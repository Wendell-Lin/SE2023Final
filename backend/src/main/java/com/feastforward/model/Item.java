package com.feastforward.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import org.hibernate.annotations.BatchSize;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "items")
@Data
public class Item implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message= "item name may not be empty")
    @Size(max = 50)
    private String name;
    
    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    @Column(name = "location", nullable = true)
    private String location;

    @Column(name = "latitude", nullable = false)
    @NotNull(message= "latitude may not be empty")
    private double latitude;

    @Column(name = "longitude", nullable = false)
    @NotNull(message= "longitude may not be empty")
    private double longitude;

    @Column(name = "quantity", nullable = false)
    @NotNull(message= "quantity may not be empty")
    private Integer quantity;

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

    @Column(name = "image_list", nullable = true)
    @Size(max = 10)
    @BatchSize(size = 100)
    private List<String> imageList = new ArrayList<>();

    @ManyToMany(mappedBy = "followedItems")
    private List<User> followers = new ArrayList<>();

    public void addImage(String image) { this.imageList.add(image); }

    public void removeImage(String image) { this.imageList.remove(image); }

    public void clearImages() { this.imageList.clear(); }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Item)) return false;
        Item other = (Item) o;
        return Objects.equals(getId(), other.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
