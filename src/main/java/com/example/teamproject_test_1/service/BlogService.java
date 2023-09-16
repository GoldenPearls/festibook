package com.example.teamproject_test_1.service;


import com.example.teamproject_test_1.domain.Article;
import com.example.teamproject_test_1.dto.AddArticleRequest;
import com.example.teamproject_test_1.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor //final 붙거나 @NotNull이 붙은 필드의 생성자 추가
@Service // 해당 빈을 서블릿 컨테이너에 등록
public class BlogService {

    private final BlogRepository blogRepository;

    public Article save(AddArticleRequest request){
        return blogRepository.save(request.toEntity());
    }

}