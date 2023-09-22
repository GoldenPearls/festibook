package com.in4mation.festibook.repository.admin;

import com.in4mation.festibook.dto.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface AdminMapper {
    //로그인을 할 때 회원정보 조회 필요
    List<MemberDTO> select();
}
