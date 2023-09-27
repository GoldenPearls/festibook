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

                fetch('/api/find-id?name=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email))
                    .then(function(response) {
                        return response.json(); // text() 대신 json() 사용
                    })
                    .then(function(data) {
                        alert(data.message); // data 자체가 객체이므로 .message 속성 바로 접근 가능
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
