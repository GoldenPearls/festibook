package com.in4mation.festibook.service.mypage;

import com.in4mation.festibook.dto.Mypage.MyPageDTO;

public interface MyPageService {

    // 특정 회원의 상세 정보
    MyPageDTO selectMemberDetailsById(String memberId);

    // 회원의 프로필 이미지를 업데이트
    int updateProfileImage(String memberId, byte[] profileImage);

    // 회원의 상세 정보를 업데이트
    int updateMemberInfo(MyPageDTO memberInfo);

}
