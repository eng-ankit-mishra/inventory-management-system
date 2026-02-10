package com.example.inventory.controller;

import com.example.inventory.entity.Category;
import com.example.inventory.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository){
        this.categoryRepository=categoryRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategory(){
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping("/create-category")
    @PreAuthorize("hasRole('ADMIN')")
    public void createCategory(@RequestBody Category category){
        categoryRepository.save(category);
    }

}
