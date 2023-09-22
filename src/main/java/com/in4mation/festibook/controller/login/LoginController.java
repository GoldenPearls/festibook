package com.in4mation.festibook.controller.login;

import com.in4mation.festibook.config.SecurityConfig;
import com.in4mation.festibook.dto.member.MemberDTO;
import com.in4mation.festibook.jwt.JwtUtils;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    // 사용자 인증을 위해 필요 => 시큐리티
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody MemberDTO memberDTO){
        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(memberDTO.getMember_id(), memberDTO.getMember_password()));

        // member_id와 name 가져오기
        String member_id = memberDTO.getMember_id();
        String member_name = memberDTO.getMember_name();

        // JWT 토큰 생성
        String jwt = jwtUtils.createAccessToken(member_id, member_name);

        return ResponseEntity.ok(new JwtResponse(jwt));
    }

    @Getter
    @Setter
    class JwtResponse {
        private String token;

        public JwtResponse(String token) {
            this.token = token;
        }
    }

}
