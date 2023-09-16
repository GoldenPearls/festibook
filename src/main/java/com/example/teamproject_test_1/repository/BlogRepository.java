package com.example.teamproject_test_1.repository;

import com.example.teamproject_test_1.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Article, Long> {
}
