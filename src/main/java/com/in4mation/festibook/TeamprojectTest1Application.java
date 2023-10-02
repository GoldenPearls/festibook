package com.in4mation.festibook;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.in4mation.festibook.repository")
public class TeamprojectTest1Application {

    public static void main(String[] args) {

        SpringApplication.run(TeamprojectTest1Application.class, args);
    }

}
