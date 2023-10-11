window.onload = function() {
    var findIdForm = document.getElementById('findIdForm');

    if (findIdForm) { // form element가 존재하는지 확인
        findIdForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var nameInput = document.getElementById('name');
            var emailInput = document.getElementById('email');

            if (nameInput && emailInput) { // input elements가 존재하는지 확인
                var name = nameInput.value;
                var email = emailInput.value;


                if (!name) {
                    alert("이름을 입력해주세요.");
                    return;
                }

                if (!email) {
                    alert("이메일을 입력해주세요.");
                    return;
                }

                fetch('/api/find-id?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email))
                    .then(function(response) {
                        return response.json(); // text() 대신 json() 사용
                    })
                    .then(function(data) {
                        Swal.fire({
                            title: '아이디 찾기',
                            text: data.message,
                            confirmButtonText: '로그인 페이지로',
                            cancelButtonText: '돌아가기',
                            showCancelButton: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = "http://localhost:8080/login";
                            }
                        });



                    })
                    .catch(function(error) {
                        console.error(error);
                    });

            } else {
                console.error("Name or Email input not found");
            }
        });
    } else {
        console.error("Find ID form not found");
    }
};
