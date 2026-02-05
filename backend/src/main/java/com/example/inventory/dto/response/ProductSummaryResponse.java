package com.example.inventory.dto.response;

import lombok.Data;

@Data
public class ProductSummaryResponse {
    private long totalProducts;
    private double totalPrice;
    private long lowStock;
}
