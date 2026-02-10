package com.example.inventory.config;

import com.example.inventory.entity.Category;
import com.example.inventory.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(CategoryRepository categoryRepository){
        return args ->{
            if(categoryRepository.count()==0){
                List<Category> defaults = List.of(
                        Category.builder().name("Electronics").description("Gadgets and devices").build(),
                        Category.builder().name("Clothing").description("Apparel and fashion").build(),
                        Category.builder().name("Groceries").description("Daily essentials").build(),
                        Category.builder().name("Furniture").description("Home and office decor").build()
                );

                categoryRepository.saveAll(defaults);
                System.out.println("✅ Default Categories Seeded!");
            }
        };
    }
}
