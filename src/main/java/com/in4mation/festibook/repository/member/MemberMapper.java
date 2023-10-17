package com.in4mation.festibook.repository.member;

import com.in4mation.festibook.dto.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MemberMapper {
   
   //회원가입
   int insert(MemberDTO memberDTO);
   
   //아이디 중복검사
   boolean isIdDuplicated(String member_id);

   //이메일 중복검사
   boolean isEmailDuplicated(String member_email);
}
