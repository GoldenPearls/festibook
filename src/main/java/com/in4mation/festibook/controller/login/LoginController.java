package com.in4mation.festibook.controller.login;

import com.in4mation.festibook.dto.member.MemberDTO;
import com.in4mation.festibook.jwt.JwtUtils;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    // AuthenticationManager를 스프링에서 자동으로 주입받아 사용
    // 사용자 인증을 위해 필요합니다.
    @Autowired
    private AuthenticationManager authenticationManager;

    // JWT 토큰 생성을 위해 필요
    @Autowired
    private JwtUtils jwtUtils;

    /*@PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody MemberDTO memberDTO){
        // 사용자 인증 + memberDTO로부터 사용자 ID와 비밀번호를 가져와 인증을 시도
       try {
           // 성공시 내부적으로 200 OK 상태 코드와 함께 응답 본문에 JwtResponser 객체를 JSON 형식으로 담음
           Authentication authentication = authenticationManager.authenticate(
                   new UsernamePasswordAuthenticationToken(memberDTO.getMember_id(), memberDTO.getMember_password()));

           // member_id와 name 가져오기
           String member_id = memberDTO.getMember_id();
           String member_name = memberDTO.getMember_name();

           // JWT 토큰 생성
           String jwt = jwtUtils.createAccessToken(member_id, member_name);


           // 생성된 JWT 토큰을 응답 본문에 담아 반환
           return ResponseEntity.ok(new JwtResponse(jwt));


       }
       catch (AuthenticationException e){
           // 인증 실패한 경우 에러 메세지 + 401 상태 코드 반환
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패 : 아이디나 비밀번호 확인해주세요");
       }
       catch(Exception e){
           // 그 외 에러의 경우 500 메세지
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("DpRLCL AHTGKS DPFJ");
       }



    }*/

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody MemberDTO memberDTO){
        try {
            // 사용자 인증
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            memberDTO.getMember_id(),
                            memberDTO.getMember_password()
                    )
            );

            // JWT 토큰 생성 및 반환
            String jwt = jwtUtils.createAccessToken(memberDTO.getMember_id(), memberDTO.getMember_name());
            return ResponseEntity.ok(new JwtResponse(jwt));
        }
        catch (AuthenticationException e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증 실패 : 아이디나 비밀번호 확인해주세요");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 내부 오류");
        }
    }

    // JWT 토큰을 담을 내부 클래스를 정의
    @Getter
    @Setter
    class JwtResponse {
        private String token;

        // 생성자를 통해 토큰을 초기화
        public JwtResponse(String token) {
            this.token = token;
        }
    }

}
