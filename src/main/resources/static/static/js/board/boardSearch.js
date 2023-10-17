function formatDateToDayMonthYear(dateString) {
    const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
}

document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault(); // 폼의 기본 동작 방지

    var searchCondition = document.getElementById("searchCondition").value;
    var searchKeyword = document.getElementById("searchKeyword").value;

    // 검색어가 비어있으면 페이지네이션 다시 보여주기
    if (!searchKeyword.trim()) {
        document.querySelector("nav[aria-label]").style.display = '';
        return;  // 함수 종료
    }

    // AJAX 요청으로 검색 결과를 가져옴
    // 서버에 검색 조건(searchCondition)과 검색어(searchKeyword)를 전달하고, 검색 결과를 화면에 표시
    // 아래는 예시 코드로 실제 서버와 통신하는 방법은 서버 구현에 따라 다를 수 있습니다.
    // 서버에서 검색 결과를 JSON 형식으로 반환한다고 가정합니다.
    $.ajax({
        type: "GET",
        url: "/search", // 실제 검색을 처리하는 서버 엔드포인트
        data: {
            condition: searchCondition,
            keyword: searchKeyword
        },
        success: function (data) {
            // 검색 결과를 처리하여 웹페이지에 표시
            // 예시: 검색 결과를 테이블에 추가
            var tableBody = document.querySelector(".board_list tbody");
            tableBody.innerHTML = ""; // 기존 내용 지우기

            data.forEach(function (result) {
                var newRow = tableBody.insertRow();
                newRow.innerHTML = `
                    <td>${result.board_idx}</td>
                    <td>${result.classification}</td>
                    <td><a href="/board/${result.board_idx}">${result.title}</a></td>
                    <td>${result.creator_id}</td>
                    <td>${formatDateToDayMonthYear(result.created_datetime)}</td>
                    <td>${result.hit_cnt}</td>
                `;
            });

            // 페이지네이션 숨기기
            document.querySelector("nav[aria-label]").style.display = 'none';


        },
        error: function (error) {
            console.error("검색 실패:", error);
        }
    });
});
