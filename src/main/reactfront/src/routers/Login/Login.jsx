import React, { useEffect, useState } from 'react'
import "./Login.css";
import logoImage from '../../img/Loginlogo.png';

const User = {
    email: 'test@example.com',
    pw: 'test2323@@@'
}


export default function Login() {
    // 사용자 입력과 검증을 위한 상태들
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    // email과 pw 검증 상태에 변화가 있을 때마다 실행되는 useEffect
    useEffect(() => {
        if(emailValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    };
    const onClickConfirmButton = () => {
        if(email === User.email && pw === User.pw) {
            alert('로그인에 성공했습니다.')
        } else {
            alert("등록되지 않은 회원입니다. 회원가입 필요");
        }
    }

    return (
        <div className="mainContainer">
        <div className="page">

            <div className="contentWrap">
                <div className="logoImage">
                    <img src={logoImage} alt="Logo Description"/>
                </div>

                <div className="logoName">
                    기억하고 싶은 축제 <br/>FestiBook와 함께 해요!
                </div>

                <div
                    className="inputWrap"
                >
                    <input
                        className="input"
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!emailValid && email.length > 0 && (
                        <div>올바른 아이디를 입력해주세요.</div>
                    )}
                </div>

                <div className="inputWrap">
                    <input
                        className="input"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={pw}
                        onChange={handlePw}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!pwValid && pw.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </div>

                <div className="text">
                    <div>아이디 찾기</div>
                    <div>비밀번호 찾기</div>
                    <div>회원가입</div>
                </div>
            </div>



            <div className="buttonContainer">
                <button onClick={onClickConfirmButton} className="bottomButton">
                    LOGIN
                </button>
            </div>
        </div>
        </div>
    );
}