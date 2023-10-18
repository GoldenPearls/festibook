window.onload = function() {
    var deleteAccountForm = document.getElementById('deleteAccountForm');

    if (deleteAccountForm) { // form element가 존재하는지 확인
        deleteAccountForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var idInput = document.getElementById('id');
            var passwordInput = document.getElementById('password');


            if (idInput && passwordInput) { // input elements가 존재하는지 확인
                var id= idInput.value;
                var password= passwordInput.value;

                if (!id) {
                    alert("아이디를 입력해주세요.");
                    return;
                }

                if (!password) {
                    alert("비밀번호를 입력해주세요.");
                    return;
                }


                fetch('/delete_account', {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({
                        id : id,
                        password : password
                    })
                })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error('네트워크 response error');
                        }
                        return response.json();
                    })
                    .then(function(data) {
                        alert(data.message); // 받아온 JSON 데이터 중 message 값을 alert로 띄웁니다.

                        // 계정이 성공적으로 삭제되었을 경우 페이지 리다이렉트 등 추가 작업 수행 가능
                        if (data.success === true){  // success 필드가 true인 경우만 리다이렉트합니다.
                            // 로그아웃 처리 (JWT 토큰 제거)
                            localStorage.removeItem('jwt');  // 사용한 스토리지 종류에 맞추어 변경
                            // 메인 페이지로 리다이렉트
                            window.location.href = "http://61.97.187.120:8080/";
                        }



                    })
                    .catch(function(error) {
                        console.error(error);
                    });

            } else {
                console.error("회원님의 아이디 또는 비밀번호가 다릅니다 확인 후 다시 설정해주세요.");
            }
        });
    } else {
        console.error("패스워드의 형식에서 이상을 감지했습니다. 올바른 패스워드 형식으로 진행해주세요.");
    }
};
