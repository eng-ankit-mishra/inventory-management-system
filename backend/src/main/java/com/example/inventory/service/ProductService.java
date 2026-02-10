package com.example.inventory.service;

import com.example.inventory.dto.request.ProductRequest;
import com.example.inventory.dto.response.ProductSummaryResponse;
import com.example.inventory.entity.Category;
import com.example.inventory.entity.Product;
import com.example.inventory.entity.TransactionHistory;
import com.example.inventory.repository.CategoryRepository;
import com.example.inventory.repository.ProductRepository;
import com.example.inventory.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final TransactionRepository transactionRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductSummaryResponse getProductSummary(){
        List<Product> allProducts=productRepository.findAll();

        List<Product> lowStockProducts=allProducts.stream()
                .filter(p->p.getQuantity()<10)
                .toList();

        long lowStocks=lowStockProducts.size();

        double totalPrice=allProducts.stream().mapToDouble(p->p.getPrice() * p.getQuantity()).sum();

        long totalProducts=allProducts.size();

        ProductSummaryResponse response = new ProductSummaryResponse();

        response.setLowStock(lowStocks);
        response.setTotalProducts(totalProducts);
        response.setTotalPrice(totalPrice);

        return response;


    }

    public Product addProduct(ProductRequest request) {
        Category category = categoryRepository.findByName(request.getCategoryName())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        Product product = new Product();
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        product.setCategory(category);

        logTransaction("PRODUCT ADDED",product.getName());

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequest request) {
        Product existingProduct = getProductById(id); // Re-use our helper method

        if (request.getCategoryName() != null) {
            Category category = categoryRepository.findByName(request.getCategoryName())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existingProduct.setCategory(category);
        }

        if (request.getName() != null) existingProduct.setName(request.getName());
        if (request.getSku() != null) existingProduct.setSku(request.getSku());
        if (request.getPrice() != null) existingProduct.setPrice(request.getPrice());
        if (request.getDescription() != null) existingProduct.setDescription(request.getDescription());

        logTransaction("PRODUCT UPDATED",existingProduct.getName());

        return productRepository.save(existingProduct);
    }

    public Product updateQuantity(Long id,Integer qty){
        Product product=getProductById(id);
        if(qty<0){
            throw new RuntimeException("Quantity cannot be negative");
        }
        product.setQuantity(qty);
        Product updatedproduct= productRepository.save(product);

        logTransaction("UPDATED QUANTITY",updatedproduct.getName());

        return updatedproduct;
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        logTransaction("PRODUCT DELETED",getProductById(id).getName());
        productRepository.deleteById(id);
    }


    public void logTransaction(String action,String productName){
        String currentUserEmail= SecurityContextHolder.getContext().getAuthentication().getName();

        TransactionHistory history=TransactionHistory.builder()
                        .userEmail(currentUserEmail)
                                .productName(productName)
                                        .action(action)
                                                .timestamp(LocalDateTime.now())

                .build();

        transactionRepository.save(history);

    }


}