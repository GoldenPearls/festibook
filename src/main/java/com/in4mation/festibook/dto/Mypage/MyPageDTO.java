package com.in4mation.festibook.dto.Mypage;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyPageDTO {

    private int details_id; //설문으로 받는 정보들을 판별할 id

    private String member_id;   //아이디

    private String member_name; //이름

    private String member_nickname;     //닉네임

    private byte[] member_profile_image;    //프로필사진

    public enum Gender {
        M, F, O
    }

    public enum AgeGroup {
        s10, s20, s30, s40, s50, s60_PLUS
    }


    private Gender gender;   // 성별

    private AgeGroup ageGroup; // 연령대

    private String categroy_name; //카테고리 이름



}
