package com.in4mation.festibook.controller.mypage;

import com.in4mation.festibook.dto.Mypage.MyPageDTO;
import com.in4mation.festibook.service.mypage.MyPageServicelmpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RestController
@RequestMapping("/mypage")
public class MyPageController {

    @Autowired
    private MyPageServicelmpl myPageServicelmpl;

    // 이미지 사이즈 제한을 위함
    private static final long MAX_IMAGE_SIZE = 500 * 1024; // 500KB


    //회원 상세 페이지
    // memberId 파라미터를 받아 해당 회원의 상세 정보 페이지를 반환
    @GetMapping("/{memberId}/detail")
    public ResponseEntity<MyPageDTO> selectMemberDetailsById(@PathVariable String memberId){
        System.out.println("=================================");
        System.out.println("memberId:" + memberId);
        // 서비스를 통해 회원의 상세 정보를 가져옴
        MyPageDTO memberDetails = myPageServicelmpl.getMemberDetails(memberId);
        return ResponseEntity.ok(memberDetails);
    }

    // 회원의 프로필 이미지를 업로드하는 로직
    @PostMapping("/uploadProfileImage")
    public String uploadProfileImage(@RequestParam String memberId, @RequestParam MultipartFile profileImage, Model model) throws Exception {
       try{
           //이미지 파일 검증 로직
           if(profileImage.isEmpty() || profileImage.getSize() > MAX_IMAGE_SIZE){
               throw new IllegalArgumentException("사이즈가 너무 큰 이미지");
           }

           else{
               byte[] imageData = profileImage.getBytes();  // MultipartFile로부터 바이트 배열 형태의 이미지 데이터를 가져온다
               myPageServicelmpl.updateProfileImage(memberId, imageData);  // 서비스를 통해 이미지 데이터를 업데이트
           }
        }
       catch (Exception e){
           model.addAttribute("errorMessage", e.getMessage());
       }

        return "redirect:/mypage/detail?memberId=" + memberId;
    }

    // 회원의 상세 정보를 업데이트하는 로직을 처리
    @PostMapping("/updateInfo")
    public String updateMemberInfo(@RequestBody MyPageDTO memberInfo) {
        System.out.println("---------------------------------");
        System.out.println("memberInfo:" + memberInfo);
        myPageServicelmpl.updateMemberInfo(memberInfo);
        return "redirect:/mypage/detail?memberId=" + memberInfo.getMember_id();
    }

}
