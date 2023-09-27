function generateCode() {
    var emailInput = document.getElementById('email');

    if (emailInput) { // input element가 존재하는지 확인
        var email = emailInput.value;

        fetch('/generateCode', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({ email : email })
        })
            .then(function(response) {
                return response.text();
            })
            .then(function(message) {
                alert(message);
            });
    } else {
        console.error("Email input not found");
    }
}

function verifyCode() {
    var emailInput = document.getElementById('email');
    var codeInput = document.getElementById('code');

    if (emailInput && codeInput) { // input elements가 존재하는지 확인
        var email = emailInput.value;
        var code = codeInput.value;

        fetch('/verifyCode', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({ email : email , code : parseInt(code, 10)})
        })
            .then(function(response) {
                if (!response.ok) { // HTTP 상태 코드가 200~299 범위 내인지 확인
                    //throw new Error("HTTP error " + response.status);
                    throw new Error("인증번호가 다릅니다");
                }
                return response.text();
            })
            .then(function(password) {
                alert("회원님의 비밀번호는 :" + password + " 입니다.");
            })
            .catch(function(error) { // 예외 처리
                //alert("An error occurred: " + error.message);
                alert("이메일이 다르거나 인증번호가 다릅니다");
            });
    } else {
        console.error("Email or Code input not found");
    }
}


