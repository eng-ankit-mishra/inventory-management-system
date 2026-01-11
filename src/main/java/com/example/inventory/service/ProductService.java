package com.example.inventory.service;

import com.example.inventory.dto.ProductRequest;
import com.example.inventory.entity.Category;
import com.example.inventory.entity.Product;
import com.example.inventory.repository.CategoryRepository;
import com.example.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // 1. READ ALL
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 2. READ ONE
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // 3. CREATE
    public Product addProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        Product product = new Product();
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        product.setCategory(category);

        return productRepository.save(product);
    }

    // 4. UPDATE (Edit details like Price or Name)
    public Product updateProduct(Long id, ProductRequest request) {
        Product existingProduct = getProductById(id); // Re-use our helper method

        // Check if user provided a new category
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existingProduct.setCategory(category);
        }

        // Update other fields if they are not null
        if (request.getName() != null) existingProduct.setName(request.getName());
        if (request.getSku() != null) existingProduct.setSku(request.getSku());
        if (request.getPrice() != null) existingProduct.setPrice(request.getPrice());
        if (request.getDescription() != null) existingProduct.setDescription(request.getDescription());

        // Note: We usually don't update quantity here, we use the stock method below

        return productRepository.save(existingProduct);
    }

    // 5. DELETE
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    // 6. STOCK MANAGEMENT (The "Sell" or "Restock" logic)
    public Product updateStock(Long id, int quantityChange) {
        Product product = getProductById(id);

        int newQuantity = product.getQuantity() + quantityChange;

        // Validation: Cannot have negative stock
        if (newQuantity < 0) {
            throw new RuntimeException("Insufficient stock! You only have " + product.getQuantity());
        }

        product.setQuantity(newQuantity);
        return productRepository.save(product);
    }
}