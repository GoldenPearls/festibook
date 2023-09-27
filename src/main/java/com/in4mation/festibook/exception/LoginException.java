package com.in4mation.festibook.exception;

public class LoginException extends Exception {

    // 생성자에서 상위 클래스의 생성자를 호출하여
    // 예외 메시지를 설정합니다.
    public LoginException(String message) {
        super(message);
    }
}
