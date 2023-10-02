package com.in4mation.festibook.repository.password;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper_Pass {
    void updateVerificationCode(@Param("email") String email,@Param("code") Integer code);
    String getPasswordByEmailAndVerification(@Param("email")String email,@Param("code")Integer code);
    Integer getDelflagByEmail(@Param("email") String email); //추가한부분.

    String findUserByEmail(@Param("email") String email);

}
