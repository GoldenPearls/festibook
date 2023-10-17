package com.in4mation.festibook.dto.member;

import lombok.*;

import java.sql.Blob;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO {
    private String member_id;   //아이디

    private String member_password;     //비밀번호

    private String member_email;    //이메일

    private String member_name;     //이름

    private String member_nickname;     //닉네임

    private Blob member_profile_image;    //프로필사진

    private String member_introduce;    //소개

    private boolean member_sns;     //소셜로그인 여부 (default = false)

    private String verificationCode; //인증번호

    private int delflag; //삭제처리
}
