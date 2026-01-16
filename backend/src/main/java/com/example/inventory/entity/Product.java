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

    private String name;

    @Column(unique = true)
    private String sku;

    private Double price;
    private Integer quantity;

    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}