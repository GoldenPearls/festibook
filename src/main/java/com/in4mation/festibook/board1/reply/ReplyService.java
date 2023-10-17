package com.in4mation.festibook.board1.reply;

import java.util.List;

public interface ReplyService {
     List<ReplyDto> getReplies(int bno);
     void addReply(ReplyDto reply);
     void modifyReply(ReplyDto reply);
     void removeReply(int rno);
}
