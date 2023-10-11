window.onload = function() {
    const loginStatusNavItem = document.getElementById('loginStatusNavItem');



    // localStorage에서 JWT 토큰 가져오기
    const token = localStorage.getItem('jwt');

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
};