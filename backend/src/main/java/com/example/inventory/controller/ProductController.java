package com.example.inventory.controller;

import com.example.inventory.dto.request.ProductRequest;
import com.example.inventory.dto.response.ProductSummaryResponse;
import com.example.inventory.entity.Product;
import com.example.inventory.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getOne(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/getSummary")
    public ProductSummaryResponse getProductSummary(
    ){
        return productService.getProductSummary();
    }

    @PostMapping
    public Product createProduct(@RequestBody ProductRequest request) {
        return productService.addProduct(request);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    @PatchMapping("/{id}/quantity")
    public ResponseEntity<Product> updateQuantity(@PathVariable Long id, @RequestParam Integer qty) {
        return ResponseEntity.ok(productService.updateQuantity(id, qty));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

}