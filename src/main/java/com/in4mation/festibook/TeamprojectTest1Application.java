package com.in4mation.festibook;

<<<<<<< HEAD
=======
import org.mybatis.spring.annotation.MapperScan;
>>>>>>> calendarFDetail_ch
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
<<<<<<< HEAD
public class TeamprojectTest1Application {

    public static void main(String[] args) {
=======
@MapperScan("com.in4mation.festibook.repository")
public class TeamprojectTest1Application {

    public static void main(String[] args) {

>>>>>>> calendarFDetail_ch
        SpringApplication.run(TeamprojectTest1Application.class, args);
    }

}
