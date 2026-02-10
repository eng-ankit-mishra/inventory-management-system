package com.example.inventory.controller;

import com.example.inventory.entity.TransactionHistory;
import com.example.inventory.repository.TransactionRepository;
import com.example.inventory.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {
    private  final TransactionRepository transactionRepository;

    @GetMapping("/my-history")
    public ResponseEntity<List<TransactionHistory>> getHistory(){
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(transactionRepository.findByUserEmailOrderByTimestampDesc(email));
    }

}
