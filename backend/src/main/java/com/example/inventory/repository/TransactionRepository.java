package com.example.inventory.repository;

import com.example.inventory.entity.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionHistory,Long> {
    List<TransactionHistory> findByUserEmailOrderByTimestampDesc(String email);
}
