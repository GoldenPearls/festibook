package com.in4mation.festibook.board1.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyServiceImpl implements ReplyService {

    @Autowired
    private ReplyMapper replyMapper;

    @Override
    public List<ReplyDto> getReplies(int bno) {
        return replyMapper.selectReplies(bno);
    }

    @Override
    public void addReply(ReplyDto reply) {
        replyMapper.insertReply(reply);
    }

    @Override
    public void modifyReply(ReplyDto reply) {
        replyMapper.updateReply(reply);
    }

    @Override
    public void removeReply(int rno) {
        replyMapper.deleteReply(rno);
    }
}
