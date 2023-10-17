package com.in4mation.festibook.config;

<<<<<<< HEAD
import com.in4mation.festibook.jwt.JwtInterceptor;
import com.in4mation.festibook.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
=======
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
>>>>>>> calendarFDetail_ch
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
<<<<<<< HEAD
    @Autowired
    JwtUtils jwtUtils;

=======
>>>>>>> calendarFDetail_ch

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
<<<<<<< HEAD

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JwtInterceptor(jwtUtils))
                .addPathPatterns("/**")
                .excludePathPatterns("/home")
                .excludePathPatterns("/css/**", "/images/**", "/js/**");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploadimg/**")
                .addResourceLocations("file:/C:/rcp/teamproject_test_1/src/main/resources/static/uploadimg/"); // 배포시 경로 일치해야함
    }


=======
>>>>>>> calendarFDetail_ch
}