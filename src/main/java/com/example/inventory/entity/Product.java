package com.example.inventory.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal; // Better for money than Double

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Matches "product_id"

    private String name;

    @Column(unique = true) // SKU must be unique
    private String sku; // <--- ADDED THIS

    private Double price;
    private Integer quantity;

    private String description; // <--- ADDED THIS

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}