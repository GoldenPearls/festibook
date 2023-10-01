package com.in4mation.festibook.controller.member;

import com.in4mation.festibook.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@Controller
@RequestMapping("/member")
@RequiredArgsConstructor

public class MemberController {

    @Autowired
    private MemberService memberService;

    private  static final Logger logger
            = LoggerFactory.getLogger(MemberController.class);

    //회원가입 폼
    @GetMapping("/register")
    public String register(){
        return "registerMem";
    }



    @PostMapping("/join")
    @ResponseBody
    public ResponseEntity<Void> JoinRegister2(
            @RequestParam("member_id") String member_id,
            @RequestParam("member_password") String member_password,
            @RequestParam("member_name") String member_name,
            @RequestParam("member_nickname") String member_nickname,
            @RequestParam("member_email") String member_email) {

        boolean result = memberService.register(member_id, member_password, member_name, member_nickname, member_email);
        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //아이디 중복확인
    @GetMapping("/checkIdDuplicate/{member_id}")
    public ResponseEntity<Map<String, Boolean>> checkIdDuplicate(@PathVariable String member_id) {
        logger.info("중복검사 넘어온 아이디 : "+member_id);

        boolean duplicate = memberService.isIdDuplicated(member_id);

        logger.info("중복검사 : "+duplicate);
        Map<String, Boolean> response = Collections.singletonMap("duplicate", duplicate);
        return ResponseEntity.ok(response);
    }



}
