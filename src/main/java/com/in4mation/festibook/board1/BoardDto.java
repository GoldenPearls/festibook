package com.in4mation.festibook.board1;

import lombok.Data;

import java.sql.Timestamp;


@Data
public class BoardDto {
    private int board_idx;
    private String title;
    private String contents;
    private int hit_cnt;  // 컬럼명 변경
    private String creator_id;  // 컬럼명 변경
    private Timestamp  created_datetime;
    private String classification;  // 컬럼명 변경
    private Timestamp updated_datetime;  // 컬럼명 변경
}
