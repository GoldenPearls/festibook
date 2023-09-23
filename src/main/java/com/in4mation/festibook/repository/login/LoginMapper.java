package com.in4mation.festibook.repository.login;

import com.in4mation.festibook.dto.login.LoginDTO;
import com.in4mation.festibook.dto.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface LoginMapper {
   /* //로그인을 할 때 회원정보 조회 필요
    @Select("SELECT * FROM Member_table WHERE id = #{member_id}")
    MemberDTO selectMemberById(String id);*/

    //로그인을 할 때 회원정보 조회 필요 id = #{member_id}이 부분은 실제 컬럼이랑 동일해야함
    LoginDTO findByUsername(@Param("member_id") String username);
}
