package com.in4mation.festibook.board1.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/replies")
public class ReplyController {

    @Autowired
    private ReplyService replyService;

    // 댓글 리스트 조회
    @GetMapping("/{bno}")
    public ResponseEntity<List<ReplyDto>> getReplies(@PathVariable("bno") int bno) {
        List<ReplyDto> replies = replyService.getReplies(bno);
        return new ResponseEntity<>(replies, HttpStatus.OK);
    }

    // 댓글 작성
    @PostMapping("/{bno}")
    public ResponseEntity<Void> addReplies(@PathVariable("bno") int bno, @RequestBody ReplyDto reply) {
        // 여기에서 게시판 번호와 함께 댓글 정보를 저장해야 합니다.
        reply.setBno(bno);

        replyService.addReply(reply);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 댓글 삭제
    @DeleteMapping("/{rno}")
    public ResponseEntity<Void> deleteReply(@PathVariable("rno") int rno) {
        replyService.removeReply(rno);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
