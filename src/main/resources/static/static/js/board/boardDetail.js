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
            location.reload();
            console.log('토큰 및 memberId 삭제 완료:', localStorage.getItem('jwt'), localStorage.getItem('memberId'));
        });

        // 게시글 작성자(creator_id) 가져오기
        const creatorIdElem = document.querySelector(".creator-id");

        if (creatorIdElem) {
            let creatorId = creatorIdElem.textContent;

            if (memberId === creatorId || memberId === 'admin') {
                editButtons.style.display = "block";

                document.getElementById("editButton").addEventListener("click", function(e) {
                    e.preventDefault();

                    const boardId = document.getElementById('boardId').value;
                    location.href = `/edit/board/${boardId}`;
                });

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
                        if (result.isConfirmed) { deleteBoard(); }
                    });
                });
            } else { editButtons.style.display = "none"; }
        } else { editButtons.style.display = "none"; }
    } else { loginStatusNavItem.innerHTML = '<a href="/login" class="nav-link active">Login</a>'; }

    const boardId = document.getElementById('boardId').value;

    fetch(`/boardEdit/${boardId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('contents').value = data.contents;
            document.getElementById('classification').value = data.classification;

            fetch(`/api/replies/${boardId}`)
                .then(response => response.json())
                .then(replies => {
                    const replyListElement = document.querySelector("#reply-list");
                    replies.forEach(reply => {
                        const replyElement = document.createElement("div");
                        replyElement.classList.add("d-flex", "mb-4");


                        //작성일 표기변환
                        let date = new Date(reply.regDate);
                        let formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

                        // 댓글 내용 추가
                        const contentElement = document.createElement("div");
                        contentElement.classList.add("ms-3");

                        replyElement.innerHTML =
                            `<div class="fw-bold">${reply.creator_id}</div><br>` +
                            `<p>${reply.r_contents} <br>
                              작성일: ${formattedDate} <br></p>`;



                        if (localStorage.getItem('memberId') === reply.creator_id || localStorage.getItem('memberId') === 'admin') {
                            const deleteButton = document.createElement("button");
                            deleteButton.textContent = "삭제";

                            // CSS 적용
                            deleteButton.style.color = "#E6E6FA";
                            deleteButton.style.backgroundColor = "#ec7373";
                            deleteButton.classList.add("btn", "btn-primary");
                            deleteButton.style.whiteSpace = "nowrap";

                            const buttonWrapper = document.createElement('div');
                            buttonWrapper.appendChild(deleteButton);
                            contentElement.appendChild(buttonWrapper);

                            deleteButton.addEventListener("click", function() {
                                Swal.fire({
                                    title: '댓글 삭제',
                                    text: "정말로 이 댓글을 삭제하시겠습니까?",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: '예, 삭제합니다!',
                                    cancelButtonText: '아니오'
                                }).then((result) => {
                                    if (result.isConfirmed) { deleteReply(reply.rno); }
                                });
                            });

                        }
                        replyElement.appendChild(contentElement);
                        replyListElement.appendChild(replyElement);
                    });
                });
        });

    // Handle the form submission event to create a new comment
    document.querySelector("#reply-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const contentsValue = document.querySelector("#r_contents").value.trim();
        const creator_idValue= localStorage.getItem('memberId');

        // 아이디 값이 없는 경우
        if (!creator_idValue) {
            Swal.fire({
                title: '로그인 필요',
                text: "로그인 후 이용 가능합니다.",
                confirmButtonText: '로그인 페이지로',
                cancelButtonText: '취소',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                }
            });
            return;  // 함수 종료
        }

        if (!contentsValue) {
            Swal.fire({
                title: '내용 입력 필요',
                text: "내용을 입력해주세요.",
                icon: 'warning',
                confirmButtonText: '확인'
            });
            return;  // 함수 종료
        }

        fetch(`/api/replies/${boardId}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bno: parseInt(boardId),
                creator_id: creator_idValue,
                r_contents: contentsValue
            })
        })
            .then(response => {
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
                else { location.reload(); }
            })
            .catch(error => console.error(error));
    });

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

function deleteReply(rno) {
    fetch(`/api/replies/${rno}`, { method:"DELETE" })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status:${response.status}`);
            else location.reload();
        })
        .catch(error => console.error(error));
}