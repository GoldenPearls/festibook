    package com.in4mation.festibook.board1;

    import java.util.List;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    @Service
    public class BoardServiceImpl implements BoardService{

        @Autowired
        private BoardMapper boardMapper;

        @Override
        public PageResponseDTO<BoardDto> selectBoardList(PageRequestDTO pageRequest) throws Exception {
            List<BoardDto> list = boardMapper.selectBoardList(pageRequest);
            int total = boardMapper.countTotal();
            return PageResponseDTO.<BoardDto>withAll()
                    .pageRequestDTO(pageRequest)
                    .dtoList(list)
                    .total(total)
                    .build();
        }


        @Override
        public List<BoardDto> searchBoards(String condition, String keyword) throws Exception {
            // 검색 조건과 검색어를 이용하여 게시물을 검색하는 로직을 구현
            // SQL 쿼리를 사용하여 검색하거나, MyBatis 등의 ORM을 활용할 수 있음
            // 검색 결과를 리스트로 반환
            return boardMapper.searchBoards(condition, keyword);
        }

        @Override
        public BoardDto selectBoardDetail(int id) throws Exception {  // 새로운 구현 부분
            return boardMapper.selectBoardDetail(id);
        }

        @Override
        public void increaseHitCount(int id) throws Exception {
            boardMapper.updateHitCount(id);
        }

        @Override
        public void insertBoard(BoardDto board) throws Exception {
            boardMapper.insertBoard(board);
        }



        @Override
        public PageResponseDTO<BoardDto> selectCommunityBoardList(PageRequestDTO pageRequest) throws Exception {
            List<BoardDto> list = boardMapper.selectCommunityBoardList(pageRequest);
            int total = boardMapper.countCommunityTotal();
            return PageResponseDTO.<BoardDto>withAll()
                    .pageRequestDTO(pageRequest)
                    .dtoList(list)
                    .total(total)
                    .build();
        }

        @Override
        public PageResponseDTO<BoardDto> selectAnnouncementBoardList(PageRequestDTO pageRequest) throws Exception {
            List<BoardDto> list = boardMapper.selectAnnouncementBoardList(pageRequest);
            int total = boardMapper.countAnnouncementTotal();
            return PageResponseDTO.<BoardDto>withAll()
                    .pageRequestDTO(pageRequest)
                    .dtoList(list)
                    .total(total)
                    .build();
        }

        @Override
        public PageResponseDTO<BoardDto> selectQuestionAnswersBoardList(PageRequestDTO pageRequest) throws Exception {
            List<BoardDto> list = boardMapper.selectQuestionAnswersBoardList(pageRequest);
            int total = boardMapper.countQuestionAnswersTotal();
            return PageResponseDTO.<BoardDto>withAll()
                    .pageRequestDTO(pageRequest)
                    .dtoList(list)
                    .total(total)
                    .build();
        }

        @Override
        public PageResponseDTO<BoardDto> selectLostItemBoardList(PageRequestDTO pageRequest) throws Exception {
            List<BoardDto> list = boardMapper.selectLostItemBoardList(pageRequest);
            int total = boardMapper.countLostItemTotal();
            return PageResponseDTO.<BoardDto>withAll()
                    .pageRequestDTO(pageRequest)
                    .dtoList(list)
                    .total(total)
                    .build();
        }


        @Override
        public void deleteBoard(int id) throws Exception {
            boardMapper.deleteBoard(id);
        }

        @Override
        public void updateBoard(BoardDto board) throws Exception {
            boardMapper.updateBoard(board);
        }


    }
