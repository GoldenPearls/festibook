package com.example.teamproject_test_1.controller;

import com.example.teamproject_test_1.domain.Article;
import com.example.teamproject_test_1.dto.AddArticleRequest;
import com.example.teamproject_test_1.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController //HTTP Response Body에 객체 데이터를 json형식을 반환하는 컨트롤러
public class BlogApiController {
    private final BlogService blogService;

    @PostMapping("/api/articles")
    public ResponseEntity<Article> addArticle(@RequestBody AddArticleRequest request){
        Article saveAritcle = blogService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(saveAritcle);
    }
}
