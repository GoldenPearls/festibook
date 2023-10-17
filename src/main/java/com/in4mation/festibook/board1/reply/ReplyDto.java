package com.in4mation.festibook.board1.reply;


import lombok.Data;

import java.util.Date;

@Data
public class ReplyDto {

    private int rno;
    private int bno;
    private String creator_id;
    private String r_contents;
    private Date regDate;
}
