package com.in4mation.festibook.controller.change;

import com.in4mation.festibook.service.change.MemberService_change_pw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MemberController_change_pw {

    private final MemberService_change_pw memberServiceChangePw;

    @Autowired
    public MemberController_change_pw(MemberService_change_pw memberServiceChangePw) {
        this.memberServiceChangePw = memberServiceChangePw;
    }

    @GetMapping("/change_pw")
    public String changePasswordPage() {


        return "change_pw";  // HTML 파일의 이름을 반환합니다.
    }


    //    @PostMapping("/change_password")
//    @ResponseBody
//    public String changePassword(@RequestBody Map<String, Object> payload) {
//        String email = (String) payload.get("email");
//        String currentPassword = (String) payload.get("currentPassword");
//        String newPassword = (String) payload.get("newPassword");
////        System.out.println("currentPassword===>"+currentPassword);
////        System.out.println("newPassword===>"+newPassword);
////        System.out.println("email===>"+email);
//        return memberServiceChangePw.changePassword(email, currentPassword, newPassword);
//    }
//}
    @PostMapping("/change_password")
    @ResponseBody
    public Map<String, String> changePassword(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        String currentPassword = (String) payload.get("currentPassword");
        String newPassword = (String) payload.get("newPassword");

        Map<String, String> response = new HashMap<>();
        response.put("message", memberServiceChangePw.changePassword(email, currentPassword, newPassword));

        return response;
    }
}
