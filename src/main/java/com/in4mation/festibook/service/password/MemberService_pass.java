package com.in4mation.festibook.service.password;

import com.in4mation.festibook.repository.password.MemberMapper_Pass;
import org.springframework.stereotype.Service;

@Service
public class MemberService_pass {

    private final MemberMapper_Pass mapper;

    public MemberService_pass(MemberMapper_Pass mapper){
        this.mapper = mapper;
    }

    public void updateCode(String email, int code) {
        if (emailNotExist(email)) {
            throw new IllegalArgumentException("Email not found");
        }
        mapper.updateVerificationCode(email, code);
    }

    public String verifyCodeAndGetPassword(String email, int code){
        if (emailNotExist(email)) {
            throw new IllegalArgumentException("Email not found");
        }

        String password = mapper.getPasswordByEmailAndVerification(email,code);

        if (password == null) {
            throw new IllegalArgumentException("Invalid verification code");
        }

        return password;
    }

    private boolean emailNotExist(String email) {
        // 이메일이 존재하는지 확인하는 코드 작성
       // return mapper.findUserByEmail(email) == null;
        return false;
    }
}

