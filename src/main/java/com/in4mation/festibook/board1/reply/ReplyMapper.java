package com.in4mation.festibook.board1.reply;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReplyMapper {
    List<ReplyDto> selectReplies(int bno);
    void insertReply(ReplyDto reply);
    void updateReply(ReplyDto reply);
    void deleteReply(int rno);
}
