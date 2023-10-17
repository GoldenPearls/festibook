// 로그인 후 받은 memberId 값을 localStorage에 저장하는 코드 추가 필요

window.onload = function() {
    var boardWriteForm = document.getElementById('boardWriteForm');
    var creatorIdInput = document.getElementById('creator_id');
    var classificationSelect = document.getElementById('classification');

    var memberId = localStorage.getItem('memberId');

    if (memberId === 'admin') {
        let optionNode = document.createElement("option");
        optionNode.text ='공지사항';
        optionNode.value ='공지사항';
        classificationSelect.add(optionNode);
    }

    if (boardWriteForm) {
        boardWriteForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var titleInput = document.getElementById('title');
            var contentsInput = document.getElementById('contents');


            if (!titleInput.value) {
                alert("제목을 입력해주세요.");
                return;
            }

            if (!contentsInput.value) {
                alert("내용을 입력해주세요.");
                return;
            }

            if (!classificationSelect.value) {
                alert("글 종류를 선택해주세요.");
                return;
            }



            console.log("Member ID:", memberId);

            if (!memberId) {
                alert("글 작성을 하려면 로그인을 해야합니다.");
                return;
            }

            creatorIdInput.value = memberId;

            // AJAX 요청으로 데이터 전송
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/write/board", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    Swal.fire({
                        title: '글 작성 완료',
                        text: '글이 성공적으로 작성되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.href = "/board/openBoardList.do"; // 글 목록 페이지로 이동
                        }
                    });
                }
            };

            var data = JSON.stringify({
                "title": titleInput.value,
                "contents": contentsInput.value,
                "classification": classificationSelect.value,
                "creator_id": memberId
            });

            // 데이터 전송
            xhr.send(data);
        });
    } else {
        console.error("폼이 없습니다. 페이지를 새로고침 해보세요.");
    }
};
