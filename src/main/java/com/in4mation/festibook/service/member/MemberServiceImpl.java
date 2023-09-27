package com.in4mation.festibook.service.member;

import com.in4mation.festibook.controller.member.MemberController;
import com.in4mation.festibook.dto.member.MemberDTO;
import com.in4mation.festibook.repository.member.MemberMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService{
    private  static final Logger logger
            = LoggerFactory.getLogger(MemberController.class);
    @Autowired
    private  MemberMapper memberMapper;

    @Override
    public int insertMember(MemberDTO memberDTO) {

        logger.info("서비스 DTO: " + memberDTO.toString());


        int result = memberMapper.insert(memberDTO);

        logger.info("서비스 결과 : " + memberDTO.toString());

        return  result;
    }

    public boolean register(String member_id, String member_password, String member_name, String member_nickname,
                            String member_email) {

        // CommonMemberDTO 객체 생성 및 정보 설정
        MemberDTO memberDTO = new MemberDTO();
        memberDTO.setMember_id(member_id);
        memberDTO.setMember_password(member_password);
        memberDTO.setMember_name(member_name);
        memberDTO.setMember_nickname(member_nickname);
        memberDTO.setMember_email(member_email);

        // CommonMemberDAO를 사용하여 회원 정보 저장
        int result = memberMapper.insert(memberDTO);
        return result == 1;
    }

    @Override
    public boolean isIdDuplicated(String member_id) {
        return memberMapper.checkId(member_id);
    }
}
