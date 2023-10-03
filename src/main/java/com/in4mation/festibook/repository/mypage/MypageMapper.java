package com.in4mation.festibook.repository.mypage;

import com.in4mation.festibook.dto.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MypageMapper {

    //
    MemberDTO selectMemberById(String memberId);

    //업데이트
    int insert(MemberDTO memberDTO);
}
