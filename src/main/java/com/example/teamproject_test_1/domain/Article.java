package com.example.teamproject_test_1.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity // JPA 엔터티 클래스임을 나타내는 어노테이션
@Getter // Lombok 어노테이션으로, 모든 필드에 대한 Getter 메서드를 자동으로 생성
@NoArgsConstructor(access = AccessLevel.PROTECTED) // Lombok으로 생성된 기본 생성자를 protected 접근 지정자로 생성
public class Article {
    @Id // 엔터티의 주요 키(primary key)를 나타내는 어노테이션
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 값을 생성하도록 지정하는 어노테이션, 기본 설정대로 자동 생성
    @Column(name="id", updatable = false) // 엔터티의 필드와 데이터베이스 컬럼 간의 매핑을 지정하는 어노테이션
    private Long id;

    @Column(name="title", nullable=false)
    private String title;

    @Column(name="content", nullable = false)
    private String content;

    @Builder //Lombok으로 생성자를 자동으로 생성하는데, 빌더 패턴을 활용하여 객체를 생성
    public Article(String title, String content){
        this.title = title;
        this.content=content;
    }

    /*new Article("abc", "aaaaaa"); //빌더 패턴을 적용하지 않고 객체 생성*/

    /*Article.builder().title("abc").content("def").build(); //빌더패턴 적용*/
}
