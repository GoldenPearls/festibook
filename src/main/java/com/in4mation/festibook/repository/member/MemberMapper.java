package com.in4mation.festibook.repository.member;

import com.in4mation.festibook.dto.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MemberMapper {
   int insert(MemberDTO memberDTO);


   boolean checkId(String member_id);
}
