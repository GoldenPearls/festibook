import { useAuth } from "../Login/AuthProvider";
import React from "react";
import "./MyPage.css";

function MyPage() {
    const { isLoggedIn } = useAuth();


    return (
        <div id="myPage">
            <div className="profileSection">
                <img src="path_to_image" alt="Profile Image" id="profileImage"/>
            </div>
            <div className="infoSection">
                <h2 id="nickname">닉네임</h2>
                <p id="selfIntro">자기소개</p>
            </div>
            <div className="buttonsSection">
                <button id="likedEvents">찜한행사</button>
                <button id="myPosts">내가 쓴 글</button>
            </div>
            <div id="contentContainer" className="contentContainer">

            </div>
            <div className="modifySection">
                <button id="modifyInfo">회원정보 수정</button>
                <button id="modifyPassword">비밀번호 수정</button>
                <button id="withdraw">회원탈퇴</button>
            </div>
        </div>
    );
}

export default MyPage;