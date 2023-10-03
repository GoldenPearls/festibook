package com.in4mation.festibook.controller.mypage;

import com.in4mation.festibook.dto.Mypage.MyPageDTO;
import com.in4mation.festibook.service.mypage.MyPageServicelmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("mypage")
public class MyPageController {

    @Autowired
    private MyPageServicelmpl myPageServicelmpl;

    //회원 상세 페이지
    // memberId 파라미터를 받아 해당 회원의 상세 정보 페이지를 반환
    @GetMapping("/detail")
    public String showMemberDetails(@RequestParam String memberId, Model model){
        // 서비스를 통해 회원의 상세 정보를 가져옴
        MyPageDTO memberDetails = myPageServicelmpl.selectMemberDetailsById(memberId);
        model.addAttribute("memberDetails", memberDetails);  // View에서 사용할 수 있도록 상세 정보를 모델에 추가
        return "MyPage"; // View의 이름을 반환
    }

    // 회원의 프로필 이미지를 업로드하는 로직
    @PostMapping("/uploadProfileImage")
    public String uploadProfileImage(@RequestParam String memberId, @RequestParam MultipartFile profileImage) throws Exception {
        byte[] imageData = profileImage.getBytes();  // MultipartFile로부터 바이트 배열 형태의 이미지 데이터를 가져온다
        myPageServicelmpl.updateProfileImage(memberId, imageData);  // 서비스를 통해 이미지 데이터를 업데이트
        return "redirect:/mypage/detail?memberId=" + memberId;
    }

    // 회원의 상세 정보를 업데이트하는 로직을 처리
    @PostMapping("/updateInfo")
    public String updateMemberInfo(MyPageDTO memberInfo) {
        myPageServicelmpl.updateMemberInfo(memberInfo);
        return "redirect:/mypage/detail?memberId=" + memberInfo.getMember_id();
    }

}
