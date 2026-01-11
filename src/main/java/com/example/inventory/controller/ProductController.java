package com.example.inventory.controller;

import com.example.inventory.entity.Product;
import com.example.inventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Concept: Tells Spring this handles Web Requests & returns JSON
@RequestMapping("/api/products") // Concept: All URLs start with /api/products
// CORS: Allows your React frontend (on port 5173) to talk to this backend
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> getAll() {
        return service.getAllProducts();
    }

    @PostMapping
    public Product add(@RequestBody Product product) {
        return service.saveProduct(product);
    }
}