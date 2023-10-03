package com.in4mation.festibook.service.mypage;

import com.in4mation.festibook.dto.Mypage.MyPageDTO;
import org.springframework.stereotype.Service;

@Service
public class MyPageServicelmpl implements MyPageService{


    //회원 데이터베이스에 저장된 데이터들을 가져옴
    @Override
    public MyPageDTO getMemberDetails(String memberId) {
        return null;
    }

    // 회원의 프로필 이미지를 업데이트
    @Override
    public int updateProfileImage(String memberId, byte[] profileImage) {
        return 0;
    }


    //회원의 정보를 업데이트(수정)
    @Override
    public int updateMemberInfo(MyPageDTO memberInfo) {
        return 0;
    }
}
