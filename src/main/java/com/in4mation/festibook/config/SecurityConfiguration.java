package com.in4mation.festibook.config;

import com.in4mation.festibook.jwt.JwtUtils;
import com.in4mation.festibook.service.login.LoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration // 해당 클래스를 Spring Configuration으로 등록
@EnableWebSecurity // Spring Security를 활성화
@EnableGlobalMethodSecurity(prePostEnabled = true) // 메소드 수준에서의 보안을 활성화
public class SecurityConfiguration extends SecurityConfigurerAdapter {

   /* @Autowired // JwtUtils Bean을 주입
    private JwtUtils jwtUtils;
    @Autowired
    private UserDetailsService loginService;*/

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

   /* @Autowired
    public SecurityConfiguration(JwtUtils jwtUtils, LoginServiceImpl loginService) {
        this.jwtUtils = jwtUtils;
        this.loginService = loginService;
    }*/

    @Autowired
    public SecurityConfiguration(JwtUtils jwtUtils, @Qualifier("loginServiceImpl") UserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }


/*    @Override // HttpSecurity를 사용하여 Web Security 설정을 오버라이드한다.
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // CSRF(사이트 간 요청 위조) 공격 방어를 비활성화
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // 세션을 생성하지 않으며, STATELESS로 설정하여, 서버가 상태를 저장하지 않게합니다.
                .and()
                .authorizeRequests() // HttpServletRequest에 따라 접근을 제한
                .antMatchers("/**").permitAll() // 모든 경로에 대해 접근을 허용
                .anyRequest().authenticated(); // 그 외의 모든 요청은 인증을 요구
    }*/

    //HttpSecurity 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((authz) -> authz
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());
        return http.build();
    }

    // 웹 보안 구성
    // WebSecurityCustomizer에서 WebSecurityCustomizer사용자 정의하는 데 사용할 수 있는 콜백 인터페이스
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/ignore1", "/ignore2");
    }

   /* @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
                .build();
    }*/

    /*@Bean
    public UserDetailsManager users(DataSource dataSource) {
        UserDetails user = User.withDefaultPasswordEncoder()
                .username("user")
                .password("password")
                .build();
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        users.createUser(user);
        return users;
    }
*/
/*
    // void로 쓰면 안됨!!!!
    @Autowired // AuthenticationManagerBuilder를 주입받아 사용자 세부 서비스를 설정
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(loginService).passwordEncoder(passwordEncoder());
        // 사용자의 세부 서비스를 설정하고, 비밀번호 인코더를 설정합니다.
    }

    @Bean // AuthenticationManager Bean을 생성하여 Spring Context에 등록
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean(); // 기본 AuthenticationManager Bean을 반환
    }*/

    @Bean // PasswordEncoder Bean을 생성하여 Spring Context에 등록
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 비밀번호를 인코딩하는데 사용되는 BCryptPasswordEncoder를 반환
    }
}

