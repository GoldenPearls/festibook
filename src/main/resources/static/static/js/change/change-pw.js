window.onload = function() {
    var changePasswordForm = document.getElementById('changePasswordForm');

    if (changePasswordForm) { // form element가 존재하는지 확인
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var emailInput = document.getElementById('email');
            var currentPassInput = document.getElementById('currentPassword');
            var newPassInput= document.getElementById('newPassword');


            if (emailInput && currentPassInput && newPassInput) { // input elements가 존재하는지 확인
                var email= emailInput.value;
                var currentPass= currentPassInput.value;
                var newPass= newPassInput.value;

                if (!email) {
                    alert("이메일을 입력해주세요.");
                    return;
                }

                if (!currentPass) {
                    alert("현재 비밀번호를 입력해주세요.");
                    return;
                }

                if (!newPass) {
                    alert("새로운 비밀번호를 입력해주세요.");
                    return;
                }

                if (currentPass === newPass) {
                    alert("현재 비밀번호와 바꾸려는 비밀번호가 같습니다.");
                    return;
                }

                // console.log("email==> " + email );
                // console.log("currentPass==> " + currentPass );
                // console.log("newPass==> " + newPass );

                fetch('/change_password', {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify({
                        email : email,
                        currentPassword : currentPass,
                        newPassword : newPass
                    })
                })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {

                        alert(data.message); // 받아온 JSON 데이터 중 message 값을 alert로 띄웁니다.

                        Swal.fire({
                            title: '비밀번호 변경',
                            text: data.message,
                            confirmButtonText: '메인 페이지로 돌아가기',
                            cancelButtonText: '돌아가기',
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "/";
                            }
                        });

                    })
                    .catch(function(error) {
                        console.error(error);
                    });

            } else {
                console.error("회원님의 이메일 또는 현재 비밀번호가 다릅니다 확인 후 다시 설정해주세요.");
            }
        });
    } else {
        console.error("패스워드의 형식에서 이상을 감지했습니다. 올바른 패스워드 형식으로 진행해주세요.");
    }
};
