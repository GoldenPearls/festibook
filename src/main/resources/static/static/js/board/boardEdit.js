window.onload = function() {
    const boardId = document.getElementById('board_idx').value;
    var classificationSelect = document.getElementById('classification');

    var memberId = localStorage.getItem('memberId');

    if (memberId === 'admin') {
        let optionNode = document.createElement("option");
        optionNode.text ='공지사항';
        optionNode.value ='공지사항';
        classificationSelect.add(optionNode);
    }

    // 기존 게시글 데이터 가져오기
    fetch(`/boardEdit/${boardId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('contents').value = data.contents;
            document.getElementById('classification').value = data.classification;

        });

    // 폼 제출 시 업데이트 요청 보내기
    document.querySelector("#editBoardForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const titleElement = document.querySelector("#title");
        const contentsElement = document.querySelector("#contents");
        const classificationElement = document.querySelector("#classification");

        const titleValue = titleElement.value.trim();
        const contentsValue = contentsElement.value.trim();
        const classificationValue = classificationElement.value.trim();


        if (!titleValue) {
            alert("제목을 입력해주세요.");
            return;
        }

        if (!contentsValue) {
            alert("내용을 입력해주세요.");
            return;
        }

        if (!classificationValue) {
            alert("글 종류를 선택해주세요.");
            return;
        }

        if (!memberId) {
            alert("글 작성을 하려면 로그인을 해야합니다.");
            return;
        }

        fetch(`/edit/board`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                board_idx: parseInt(boardId),
                title: titleValue,
                contents: contentsValue,
                classification: classificationValue
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }else {
                    Swal.fire({
                        title: '게시글 수정 완료',
                        text: '게시글이 성공적으로 수정되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = `/board/${boardId}`;
                        }
                    });
                }
            })
            .catch(error => console.error(error));
    });
};
