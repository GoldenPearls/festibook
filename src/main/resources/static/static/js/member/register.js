(function () {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);

        // 아이디 유효성 검사
        const uidInput = document.querySelector('input[name="member_id"]');
        const uidRegex = /^[a-zA-Z0-9]{6,15}$/;
        const uidEmptyFeedback = document.getElementById("id-empty");
        const uidLengthFeedback = document.getElementById("id-length");
        const uidAlphanumericFeedback = document.getElementById("id-alphanumeric");
        const uidAvailableFeedback = document.getElementById("id-available");
        const uidDuplicateFeedback = document.getElementById("id-duplicate");

        uidInput.addEventListener('blur', function () {
            const uidValue = uidInput.value.trim();

            if (uidValue === "") {
                uidEmptyFeedback.style.display = "block";
                uidLengthFeedback.style.display = "none";
                uidAlphanumericFeedback.style.display = "none";
                uidAvailableFeedback.style.display = "none";
                uidDuplicateFeedback.style.display = "none";
            } else if (!uidRegex.test(uidValue)) {
                uidEmptyFeedback.style.display = "none";
                uidLengthFeedback.style.display = "block";
                uidAlphanumericFeedback.style.display = "none";
                uidAvailableFeedback.style.display = "none";
                uidDuplicateFeedback.style.display = "none";
            } else {
                uidEmptyFeedback.style.display = "none";
                uidLengthFeedback.style.display = "none";
                uidAlphanumericFeedback.style.display = "none";

                // 아이디 중복 검사 버튼 이벤트 핸들러
                const duplicateBtn1 = document.querySelector("#duplicateBtn1");
                duplicateBtn1.addEventListener("click", function (event) {
                    event.preventDefault();

                    const idInput = document.getElementById("member_id");
                    const idValue = idInput.value.trim();
                    if (idValue !== "") {
                        // 서버로 중복 검사 요청
                        fetch(`/member/checkIdDuplicate/${idValue}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.duplicate) {
                                    uidAvailableFeedback.style.display = "none";
                                    uidDuplicateFeedback.style.display = "block";
                                    document.getElementById("id-available").style.color = "green";
                                } else {
                                    uidAvailableFeedback.style.display = "block";
                                    document.getElementById("id-available").style.color = "green";
                                    uidDuplicateFeedback.style.display = "none";
                                }
                            })
                            .catch(error => console.error(error));
                    }
                });
            }
        });


// 비밀번호 유효성 검사
        const pwdInput = document.querySelector('input[name="member_password"]');
        const pwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
        pwdInput.addEventListener("blur", function () {
            const pwdValue = pwdInput.value.trim();

            if (pwdValue === "") {
                document.getElementById("password-empty").style.display = "block";
            } else if (!pwdRegex.test(pwdValue)) {
                document.getElementById("password-invalid").style.display = "block";
                document.getElementById("password-empty").style.display = "none";
            } else {
                document.getElementById("password-empty").style.display = "none";
                document.getElementById("password-invalid").style.display = "none";
            }
        });

// 비밀번호 확인 유효성 검사
        const cpasswordInput = document.querySelector('input[name="member_password2"]');
        cpasswordInput.addEventListener("input", function () {
            const pwdValue = pwdInput.value.trim();
            const cpasswordValue = cpasswordInput.value.trim();

            if (pwdValue !== cpasswordValue) {
                document.getElementById("cpassword-mismatch").style.display = "block";
                document.getElementById("cpassword-match").style.display = "none";
            } else {
                document.getElementById("cpassword-match").style.display = "block";
                document.getElementById("cpassword-match").style.color = "green";
                document.getElementById("cpassword-mismatch").style.display = "none";

            }
        });

        // 닉네임
        const nidInput = document.querySelector('input[name="member_nickname"]');
        const nidRegExp = /^[a-zA-Z0-9가-힣]{1,15}$/;
        const nidEmptyFeedback = document.getElementById("nid-empty");
        const nidInvalidFeedback = document.getElementById("nid-invalid");
        const nidAvailableFeedback = document.getElementById("nid-available");
        const nidDuplicateFeedback = document.getElementById("nid-duplicate");

        nidInput.addEventListener("blur", function () {
            const nidValue = nidInput.value.trim();

            if (nidValue === "") {
                nidEmptyFeedback.style.display = "block";
                nidInvalidFeedback.style.display = "none";
                nidAvailableFeedback.style.display = "none";
                nidDuplicateFeedback.style.display = "none";
            } else if (!nidRegExp.test(nidValue)) {
                nidEmptyFeedback.style.display = "none";
                nidInvalidFeedback.style.display = "block";
                nidAvailableFeedback.style.display = "none";
                nidDuplicateFeedback.style.display = "none";
            } else {
                nidEmptyFeedback.style.display = "none";
                nidInvalidFeedback.style.display = "none";


            }
        });



        // 이름 유효성 검사
        const nameInput = document.querySelector('input[name="member_name"]');
        const nameRegex = /^[가-힣]{1,20}$/u;
        nameInput.addEventListener('blur', function (event) {
            const nameValue = nameInput.value.trim();


            if (nameValue === "") {
                document.getElementById("name-empty").style.display = "block";
                document.getElementById("name-invalid").style.display = "none";
                document.getElementById("name-vowel").style.display = "none";
            } else if (!/^[^A-Za-z]*$/.test(nameValue)) {
                document.getElementById("name-vowel").style.display = "block";
                document.getElementById("name-empty").style.display = "none";
                document.getElementById("name-invalid").style.display = "none";
            } else if (!nameRegex.test(nameValue)) {
                document.getElementById("name-invalid").style.display = "block";
                document.getElementById("name-empty").style.display = "none";
                document.getElementById("name-vowel").style.display = "none";
            } else {
                document.getElementById("name-empty").style.display = "none";
                document.getElementById("name-invalid").style.display = "none";
                document.getElementById("name-vowel").style.display = "none";
            }
        });




        // 이메일 유효성 검사
                const emailInput = document.querySelector('input[name="member_email"]');
               // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,30}$/;
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z0-9.-]{1,30}$/;
                const emailAvailableFeedback = document.getElementById("email-available");
                const emailDuplicateFeedback = document.getElementById("email-duplicate");


                emailInput.addEventListener('blur', function (event) {
                     const emailValue = emailInput.value.trim();

                      if (emailValue === "") {
                         // 이메일이 빈 문자열일 경우
                         document.getElementById("email-empty").style.display = "block";
                         document.getElementById("email-invalid").style.display = "none";
                         emailAvailableFeedback.style.display = "none";
                         emailDuplicateFeedback.style.display = "none";
                      } else if (!emailRegex.test(emailValue)) {
                         // 이메일 형식이 올바르지 않을 경우
                         document.getElementById("email-invalid").style.display = "block";
                         document.getElementById("email-empty").style.display = "none";
                         emailAvailableFeedback.style.display = "none";
                         emailDuplicateFeedback.style.display = "none";
                      } else {
                         document.getElementById("email-empty").style.display = "none";
                         document.getElementById("email-invalid").style.display = "none";

                           // 이메일 중복 검사 버튼 이벤트 핸들러
                           const duplicateBtn1 = document.querySelector("#duplicateBtn2");
                           duplicateBtn2.addEventListener("click", function (event) {
                           event.preventDefault();

                           const EmailInput = document.getElementById("member_email");
                           const emailValue = EmailInput.value.trim();
                           if (emailValue !== "") {
                             // 서버로 중복 검사 요청
                             fetch(`/member/checkEmailDuplicate/${emailValue}`)
                             .then(response => response.json())
                             .then(data => {
                                  if (data.duplicate) {
                                   emailAvailableFeedback.style.display = "none";
                                   emailDuplicateFeedback.style.display = "block";
                                   document.getElementById("email-available").style.color = "green";
                                  } else {
                                   emailAvailableFeedback.style.display = "block";
                                   document.getElementById("email-available").style.color = "green";
                                   emailDuplicateFeedback.style.display = "none";
                                  }
                             })
                             .catch(error => console.error(error));
                             }
                             });


                      }


                });

    });
})();


// 회원가입 이벤트 핸들러
const joinButton = document.getElementById('joinButton');
joinButton.addEventListener('click', async function (e) {
    event.preventDefault();
    const form = document.getElementById('myForm');

    // 유효성 검사
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        $('#error_modal').modal('show');
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch('/member/join', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // 회원가입 성공 시 모달 팝업 띄우기
            $('#result_modal').modal('show');
            setTimeout(function () {
                window.location.href = "http://61.97.187.120:8080/login";
            }, 1500); // 3초 후 로그인 페이지로 이동
        } else {
            // 회원가입 실패 시 모달 팝업 띄우기
            $('#error_modal').modal('show');
        }
    } catch (error) {
        // 회원가입 실패 시 모달 팝업 띄우기
        $('#error_modal').modal('show');
    }
});
