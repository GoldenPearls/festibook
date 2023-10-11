window.onload = function() {
    const editButtons = document.getElementById('editButtons');
    const loginStatusNavItem = document.getElementById('loginStatusNavItem');
    // localStorage에서 JWT 토큰 가져오기
    const token = localStorage.getItem('jwt');

    if (token) {
        // 토큰이 있으면 로그인 상태임

        // 웹페이지에 저장된 로컬스토리지의 member_id값 가져오기
        const memberId = localStorage.getItem('memberId');

        // 토큰이 있으면 '로그아웃' 링크 추가
        loginStatusNavItem.innerHTML = '<a id="logoutLink" href="#" class="nav-link active">Logout</a>';

        // 로그아웃 링크에 이벤트 핸들러 등록
        document.getElementById("logoutLink").addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.removeItem('jwt');  // 토큰 삭제
            localStorage.removeItem('memberId');
            // 페이지 새로고침 or 리다이렉션 등 필요한 동작 수행...
            location.reload();

            console.log('토큰 및 memberId 삭제 완료:', localStorage.getItem('jwt'), localStorage.getItem('memberId'));
        });

        // 게시글 작성자(creator_id) 가져오기
        const creatorIdElem = document.querySelector(".creator-id");

        if (creatorIdElem) {
            let creatorId = creatorIdElem.innerText;

            if (memberId === creatorId || memberId === 'admin') {
                // 웹페이지에 저장된 로컬스토리지의 member_id값과 creator_id가 일치하는 경우,
                // 수정하기와 삭제하기 버튼 보이기
                editButtons.style.display = "block";

                // 수정하기 버튼 클릭 이벤트 핸들러 등록
                document.getElementById("editButton").addEventListener("click", function(e) {
                    e.preventDefault();

                    // 현재 게시글 ID 가져오기
                    const boardId = document.getElementById('boardId').value;

                    console.log("==========================="+ boardId)

                    // 게시글 수정 페이지로 이동
                    location.href = `/edit/board/${boardId}`;
                });

                // 삭제하기 버튼 클릭 이벤트 핸들러 등록
                document.getElementById("deleteButton").addEventListener("click", function(e) {
                    e.preventDefault();

                    Swal.fire({
                        title: '게시글 삭제',
                        text: "회원님의 소중한 정보를 정말로 삭제하시겠습니까?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: '예, 삭제합니다!',
                        cancelButtonText: '아니오'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteBoard();  // 게시글 삭제 함수 호출
                        }
                    });
                });
            } else {editButtons.style.display = "none";}
        } else {editButtons.style.display = "none";}
    }else {
        // 토큰이 없으면 '로그인' 링크 추가
        loginStatusNavItem.innerHTML = '<a href="/login" class="nav-link active">Login</a>';
    }
};

// 게시글 삭제 함수 정의
function deleteBoard() {
    const boardId = document.getElementById('boardId').value;  // 현재 게시글 ID

    fetch(`/board/${boardId}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }else {
                Swal.fire({
                    title: '게시글 삭제 완료',
                    text: '게시글이 성공적으로 삭제되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = "/board/openBoardList.do";
                    }
                });
            }
        })
        .catch(error => console.error(error));
}


