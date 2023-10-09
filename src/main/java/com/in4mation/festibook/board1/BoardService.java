package com.in4mation.festibook.board1;

import java.util.List;

public interface BoardService {

    PageResponseDTO<BoardDto> selectBoardList(PageRequestDTO pageRequest) throws Exception;

    List<BoardDto> searchBoards(String condition, String keyword) throws Exception;

    // 게시글 상세 보기 메서드 추가
    BoardDto selectBoardDetail(int id) throws Exception;

    void increaseHitCount(int id) throws Exception;

    void insertBoard(BoardDto board) throws Exception;

    // 커뮤니티 글 목록 조회 메서드 추가
    PageResponseDTO<BoardDto> selectCommunityBoardList(PageRequestDTO pageRequest) throws Exception;

    PageResponseDTO<BoardDto> selectAnnouncementBoardList(PageRequestDTO pageRequest) throws Exception;

    PageResponseDTO<BoardDto> selectQuestionAnswersBoardList(PageRequestDTO pageRequest) throws Exception;

    PageResponseDTO<BoardDto> selectLostItemBoardList(PageRequestDTO pageRequest) throws Exception;

    void deleteBoard(int id) throws Exception;

    void updateBoard(BoardDto board) throws Exception;


}
