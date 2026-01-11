package com.example.inventory.service;

import com.example.inventory.entity.Product;
import com.example.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service // Concept: Registers this class as a "Bean" (Spring manages it)
public class ProductService {

    @Autowired // Concept: Dependency Injection. Spring gives us the Repository instance.
    private ProductRepository repository;

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product saveProduct(Product product) {
        // Business Logic: Prevent saving negative prices
        if (product.getPrice() < 0) {
            throw new RuntimeException("Price cannot be negative");
        }
        return repository.save(product);
    }
}