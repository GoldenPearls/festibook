document.getElementById("classification").addEventListener("change", function() {
    var selectedOption = this.value;

    // 선택한 옵션에 따라 다른 엔드포인트를 호출
    switch (selectedOption) {
        case "전체":
            window.location.href = "/board/openBoardList.do";
            break;
        case "공지사항":
            window.location.href = "/board/announcement";
            break;
        case "커뮤니티":
            window.location.href = "/board/community";
            break;
        case "Q&A":
            window.location.href = "/board/questionAnswers";
            break;
        case "분실물 찾기":
            window.location.href = "/board/lostItem";
            break;
        default:
            break;
    }
});