window.onload = function() {
    const boardId = document.getElementById('boardId').value;


    // 기존 게시글 데이터 가져오기
    fetch(`/boardEdit/${boardId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('title').value = data.title;
            document.getElementById('contents').value = data.contents;
            document.getElementById('classification').value = data.classification;

            // Get replies for this post
            fetch(`/api/replies/${boardId}`)
                .then(response => response.json())
                .then(replies => {
                    const replyListElement = document.querySelector("#reply-list");
                    replies.forEach(reply => {
                        const replyElement = document.createElement("div");
                        replyElement.innerHTML =
                            `<h5>${reply.creator_id}</h5>` +
                            `<p>${reply.r_contents}</p>`;
                        replyListElement.appendChild(replyElement);
                    });
                });
        });


    // Handle the form submission event to create a new comment
    document.querySelector("#reply-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const contentsValue = document.querySelector("#r_contents").value.trim();
        const creator_idValue= localStorage.getItem('memberId');

        if (!contentsValue) {
            alert("내용을 입력해주세요.");
            return;
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
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }else {
                    // Reload the page to show the new reply
                    location.reload();
                }
            })
            .catch(error => console.error(error));
    });

};
