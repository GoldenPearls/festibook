package com.in4mation.festibook.service.mypage;

import com.in4mation.festibook.dto.Mypage.MyPageDTO;
import org.springframework.web.multipart.MultipartFile;

public interface MyPageService {

    // 특정 회원의 상세 정보
    MyPageDTO getMemberDetails(String memberId);

    // 회원의 프로필 이미지를 업데이트
    String updateProfileImage(String memberId, MultipartFile profileImage);

    // 회원의 상세 정보를 업데이트
    int updateMemberInfo(MyPageDTO memberInfo);

}
