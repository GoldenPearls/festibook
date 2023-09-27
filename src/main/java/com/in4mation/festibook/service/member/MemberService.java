package com.in4mation.festibook.service.member;

import com.in4mation.festibook.dto.member.MemberDTO;

public interface MemberService {

    //회원가입
    public int insertMember(MemberDTO memberDTO);

    public boolean register(String member_id, String member_password, String member_name, String member_nickname,
                            String member_email);

    //아이디 중복 검사
    public boolean isIdDuplicated (String member_id);
}
