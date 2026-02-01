package com.example.inventory.dto;

import com.example.inventory.entity.Product;
import lombok.Data;

import java.util.List;

@Data
public class ProductSummaryResponse {
    private long totalProducts;
    private double totalPrice;
    private long lowStock;
}
