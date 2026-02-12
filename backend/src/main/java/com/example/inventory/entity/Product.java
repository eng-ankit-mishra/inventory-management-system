package com.example.inventory.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 1. Force the database column to be TEXT (Fixes 'bytea' issue)
    @Column(columnDefinition = "TEXT")
    private String name;

    // 2. Force SKU to be TEXT as well
    @Column(unique = true, columnDefinition = "TEXT")
    private String sku;

    private Double price;
    private Integer quantity;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}