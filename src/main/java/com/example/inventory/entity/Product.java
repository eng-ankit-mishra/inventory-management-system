package com.example.inventory.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity // Concept: Tells Hibernate "This class is a database table"
@Data   // Concept: Lombok automatically generates Getters/Setters (less typing!)
@Table(name = "products") // Concept: Name the table "products" instead of "product"
public class Product {

    @Id // Concept: Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Concept: Auto-increment (1, 2, 3...)
    private Long id;

    @Column(nullable = false) // Concept: Validation constraint at DB level
    private String name;

    private Double price;
    private Integer quantity;
}