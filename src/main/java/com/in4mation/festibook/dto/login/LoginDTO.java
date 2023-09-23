package com.in4mation.festibook.dto.login;

import com.in4mation.festibook.dto.member.MemberDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String member_id; // id
    private String member_password; // password

    public LoginDTO() {

    }

    public LoginDTO(String userId, String userPw) {
        this.member_id = userId;
        this.member_password = userPw;
    }


    public LoginDTO(MemberDTO memberDTO) {
        this.member_id = memberDTO.getMember_id();
        this.member_password = memberDTO.getMember_password();
    }

}







