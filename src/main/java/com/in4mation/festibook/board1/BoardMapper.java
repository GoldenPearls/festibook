package com.in4mation.festibook.board1;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper		// Mapper라고 선언함
public interface BoardMapper {
    // 여기서 지정한 메서드의 이름은 쿼리의 이름과 동일해야 함 (selectBoardList)
    List<BoardDto> selectBoardList(PageRequestDTO pageRequest) throws Exception;

    int countTotal() throws Exception;

    BoardDto selectBoardDetail(int id) throws Exception;

    void updateHitCount(int id) throws Exception; // 새로운 메서드

    void insertBoard(BoardDto board) throws Exception;

    List<BoardDto> searchBoards(@Param("condition") String condition, @Param("keyword") String keyword) throws Exception;

    // 커뮤니티 글 목록 조회 메서드 추가
    List<BoardDto> selectCommunityBoardList(PageRequestDTO pageRequest) throws Exception;

    int countCommunityTotal() throws Exception;

    List<BoardDto> selectAnnouncementBoardList(PageRequestDTO pageRequest) throws Exception;

    int countAnnouncementTotal() throws Exception;

    List<BoardDto> selectQuestionAnswersBoardList(PageRequestDTO pageRequest) throws Exception;

    int countQuestionAnswersTotal() throws Exception;

    List<BoardDto> selectLostItemBoardList(PageRequestDTO pageRequest) throws Exception;

    int countLostItemTotal() throws Exception;

    void deleteBoard(int id) throws Exception;

    void updateBoard(BoardDto board) throws Exception;
}