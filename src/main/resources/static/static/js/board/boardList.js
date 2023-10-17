window.onload = function() {
    var loginStatusNavItem = document.getElementById('loginStatusNavItem');

    // localStorage에서 JWT 토큰 가져오기
    var token = localStorage.getItem('jwt');

    if (token) {
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

    } else {
        // 토큰이 없으면 '로그인' 링크 추가
        loginStatusNavItem.innerHTML = '<a href="/login" class="nav-link active">Login</a>';
    }

    // 글쓰기 버튼 클릭 시 이벤트 핸들러 등록
    document.querySelector(".write-board-button")
        .addEventListener("click", function(e) {
        e.preventDefault();

        // localStorage에서 JWT 토큰 가져오기
        var token = localStorage.getItem('jwt');

        if (!token) {
            Swal.fire({
                title: '글쓰기는 로그인이 필요합니다',
                text: "로그인 후 이용 가능합니다.",
                confirmButtonText: '로그인 바로가기',
                cancelButtonText: '취소',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                }
            });
        }else
        // 로그인된 상태로 글 작성 페이지로 이동
        window.location.href = "/write/board";
    });


};