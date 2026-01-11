package com.example.inventory.dto;

import lombok.Data;

@Data // Generates Getters/Setters automatically
public class ProductRequest {
    // We only ask for what we need from the user
    private String name;
    private String sku;         // <--- ADDED
    private Double price;
    private Integer quantity;
    private String description;
    private Long categoryId; // The key! We accept just the ID, not the whole object.
}