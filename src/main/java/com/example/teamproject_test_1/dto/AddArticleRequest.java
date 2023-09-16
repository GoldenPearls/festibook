package com.example.teamproject_test_1.dto;

import com.example.teamproject_test_1.domain.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자를 자동으로 생성
@AllArgsConstructor //모든 필드를 파라미터로 받는 생성자를 자동으로 생성
@Getter
public class AddArticleRequest {
    private String title;

    private String content;

    public Article toEntity(){ //DTO(데이터 전송 객체)에서 엔터티로 변환하기 위한 메서드를 제공
        return Article.builder().title(title).content(content).build();
    }
}