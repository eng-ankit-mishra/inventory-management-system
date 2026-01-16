package com.example.inventory.dto;

import lombok.Data;

@Data
public class ProductRequest {

    private String name;
    private String sku;
    private Double price;
    private Integer quantity;
    private String description;
    private Long categoryId;
}