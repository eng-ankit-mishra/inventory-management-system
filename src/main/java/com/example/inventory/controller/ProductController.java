package com.example.inventory.controller;

import com.example.inventory.dto.ProductRequest;
import com.example.inventory.entity.Product;
import com.example.inventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // Better return type for CRUD
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET ALL
    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    // GET ONE
    @GetMapping("/{id}")
    public Product getOne(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // CREATE
    @PostMapping
    public Product createProduct(@RequestBody ProductRequest request) {
        return productService.addProduct(request);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build(); // Returns "204 No Content" (Standard for delete)
    }

    // STOCK UPDATE (PATCH)
    // Usage: PATCH /api/products/1/stock?quantity=5 (Add 5)
    // Usage: PATCH /api/products/1/stock?quantity=-2 (Sell 2)
    @PatchMapping("/{id}/stock")
    public Product updateStock(@PathVariable Long id, @RequestParam int quantity) {
        return productService.updateStock(id, quantity);
    }
}