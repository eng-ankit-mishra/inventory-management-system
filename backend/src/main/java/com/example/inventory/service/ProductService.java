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
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final TransactionRepository transactionRepository;



    public Page<Product> getAllProducts(String search, String category, String stockStatus, Pageable pageable) {

        // 1. Start with an empty specification (Select * from Product)
        Specification<Product> spec = Specification.where(null);

        // 2. Add Search Filter (if provided)
        if (search != null && !search.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) -> {
                String likePattern = "%" + search.toLowerCase() + "%";
                // Check Name OR SKU
                return criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("sku")), likePattern)
                );
            });
        }

        // 3. Add Category Filter (if provided)
        if (category != null && !category.equals("ALL")) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("category").get("name"), category)
            );
        }

        // 4. Add Stock Logic (if provided)
        if (stockStatus != null && !stockStatus.equals("ALL")) {
            spec = spec.and((root, query, criteriaBuilder) -> {
                if (stockStatus.equals("IN_STOCK")) {
                    return criteriaBuilder.greaterThan(root.get("quantity"), 0);
                } else if (stockStatus.equals("OUT_OF_STOCK")) {
                    return criteriaBuilder.equal(root.get("quantity"), 0);
                }
                return null;
            });
        }

        // 5. Execute the optimized query
        // SQL generated: SELECT * FROM product WHERE name LIKE ? AND category = ? LIMIT ?
        return productRepository.findAll(spec, pageable);
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