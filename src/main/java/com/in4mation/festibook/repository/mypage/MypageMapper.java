package com.in4mation.festibook.repository.mypage;

import com.in4mation.festibook.dto.Mypage.MyPageDTO;
import com.in4mation.festibook.dto.member.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MypageMapper {

    // 회원 정보를 ID를 통해 조회(MemberDetail 및 Member_table 조인)
    MemberDTO selectMemberById(String memberId);

    // 이미지 업로드
    int updateProfileImageByMemberId(String memberId, byte[] profileImage);

    // 회원 정보 수정
    int updateMemberInfo(MyPageDTO memberInfo);

    // 회원의 마이페이지 정보 보여주기
    MyPageDTO getMyPageInfo(String memberId);
}
