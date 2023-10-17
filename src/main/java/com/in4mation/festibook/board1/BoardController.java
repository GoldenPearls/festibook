package com.in4mation.festibook.board1;


import com.in4mation.festibook.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller // 컨트롤러라고 선언함
public class BoardController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private BoardService boardService; //서비스와 연결

    @RequestMapping("/board/openBoardList.do")
    public ModelAndView openPageable(@RequestParam(defaultValue = "1") int page,
                                     @RequestParam(defaultValue = "10") int size) throws Exception {
        ModelAndView mv = new ModelAndView("boardList");
        PageResponseDTO<BoardDto> response =
                boardService.selectBoardList(PageRequestDTO.builder().page(page).size(size).build());
        //추가해야하는게뭘까?
        mv.addObject("boardList", response.getDtoList());
        mv.addObject("pageResult", response);
        return mv;
    }
    @GetMapping("/board/community")
    public ModelAndView openCommunityBoardList(@RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int size) throws Exception {
        ModelAndView mv = new ModelAndView("communityList");
        PageResponseDTO<BoardDto> response =
                boardService.selectCommunityBoardList(PageRequestDTO.builder().page(page).size(size).build());
        mv.addObject("community", response.getDtoList());
        mv.addObject("communityPageResult", response);
        return mv;
    }

    @GetMapping("/board/announcement")
    public ModelAndView openAnnouncementBoardList(@RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int size) throws Exception {
        ModelAndView mv = new ModelAndView("announcementList");
        PageResponseDTO<BoardDto> response =
                boardService.selectAnnouncementBoardList(PageRequestDTO.builder().page(page).size(size).build());
        mv.addObject("announcement", response.getDtoList());
        mv.addObject("announcementPageResult", response);
        return mv;
    }

    @GetMapping("/board/questionAnswers")
    public ModelAndView openQuestionAnswersBoardList(@RequestParam(defaultValue = "1") int page,
                                                  @RequestParam(defaultValue = "10") int size) throws Exception {
        ModelAndView mv = new ModelAndView("questionAnswersList");
        PageResponseDTO<BoardDto> response =
                boardService.selectQuestionAnswersBoardList(PageRequestDTO.builder().page(page).size(size).build());
        mv.addObject("questionAnswers", response.getDtoList());
        mv.addObject("questionAnswersPageResult", response);
        return mv;
    }

    @GetMapping("/board/lostItem")
    public ModelAndView openLostItemBoardList(@RequestParam(defaultValue = "1") int page,
                                                     @RequestParam(defaultValue = "10") int size) throws Exception {
        ModelAndView mv = new ModelAndView("lostItemList");
        PageResponseDTO<BoardDto> response =
                boardService.selectLostItemBoardList(PageRequestDTO.builder().page(page).size(size).build());
        mv.addObject("lostItem", response.getDtoList());
        mv.addObject("lostItemPageResult", response);
        return mv;
    }

    // 게시글 상세 보기 처리 추가.
    @RequestMapping("/board/{id}")
    public ModelAndView openBoardDetail(@PathVariable("id") int id) throws Exception {

        ModelAndView mv = new ModelAndView("boardDetail");

        boardService.increaseHitCount(id);  //조회 수 증가 로직 호출

        BoardDto board = boardService.selectBoardDetail(id);


        mv.addObject("detail", board);
        return mv;
    }

    // 게시글 상세 보기 처리 추가.
    @RequestMapping("/boardEdit/{id}")
    @ResponseBody
    public ResponseEntity<?> openBoardDetailEdit(@PathVariable("id") int id) throws Exception {
        boardService.increaseHitCount(id);  // 조회 수 증가 로직 호출
        BoardDto board = boardService.selectBoardDetail(id);
        return ResponseEntity.ok(board);
    }


    @PostMapping("/write/board")
    public ResponseEntity<?> writeBoard(@RequestBody BoardDto board) throws Exception {
        if (board.getTitle() == null || board.getTitle().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("제목을 입력해주세요.");
        }

        if (board.getContents() == null || board.getContents().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("내용을 입력해주세요.");
        }

        if (board.getClassification() == null || board.getClassification().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("글 종류를 선택해주세요.");
        }

        // 클라이언트에서 전달된 아이디 값을 가져와서 boardDto에 설정하는 부분은 제거

        boardService.insertBoard(board);

        return ResponseEntity.ok(null);  // 성공적으로 처리되었음을 알림
    }

    // 게시글 작성 폼 페이지 열기 (GET)
    @GetMapping("/write/board")
    public String openWriteBoardForm(Model model) {
        model.addAttribute("board", new BoardDto());

        return "boardWrite";
    }


    @GetMapping("/search")
    @ResponseBody
    public ResponseEntity<List<BoardDto>> searchBoards(@RequestParam String condition, @RequestParam String keyword) {
        try {
            List<BoardDto> searchResults = boardService.searchBoards(condition, keyword);
            return ResponseEntity.ok(searchResults);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @DeleteMapping("/board/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") int boardIdx) {
        try {
            boardService.deleteBoard(boardIdx);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/edit/board/{id}")
    public String openEditForm(@PathVariable("id") int id, Model model) throws Exception {
        BoardDto board = boardService.selectBoardDetail(id);
        model.addAttribute("board", board);
        return "editBoard";
    }

    @PutMapping("/edit/board")
    public ResponseEntity<?> updateBoard(@RequestBody BoardDto board) {
        try {
            boardService.updateBoard(board);
            return ResponseEntity.ok(null);  // 성공적으로 처리되었음을 알림
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 수정에 실패했습니다.");
        }
    }
}