package com.in4mation.festibook.dto.login;

import com.in4mation.festibook.dto.member.MemberDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDTO {
    private String member_id; // id
    private String member_password; // password
    private int delflag;

}







