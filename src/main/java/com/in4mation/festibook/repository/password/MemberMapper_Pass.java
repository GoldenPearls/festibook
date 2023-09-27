package com.in4mation.festibook.repository.password;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper_Pass {
    void updateVerificationCode(@Param("email") String email,@Param("code") Integer code);
    String getPasswordByEmailAndVerification(@Param("email")String email,@Param("code")Integer code);


   // String findUserByEmail(@Param("email") String email);

}
