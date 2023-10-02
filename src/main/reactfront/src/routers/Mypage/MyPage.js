import { useAuth } from "../Login/AuthProvider";
import React, { useState } from 'react';
import "./MyPage.css";
import myprofile_image from '../../img/mypage/userprofile.png'

function MyPage() {
    const [profileImage, setProfileImage] = useState(myprofile_image); // 초기 이미지 설정
    const [ageGroup, setAgeGroup] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // 이미지 로드가 완료되면 상태를 업데이트합니다.
            }
            reader.readAsDataURL(file); // 파일을 읽어 data URL로 변환합니다.
        }
    };

    const handleAgeGroupChange = (event) => {
        setAgeGroup(event.target.value);
    }



    return (
        <div className="myPage">
            <h2 id="nickname">나의 계정</h2>
            <div className="infoSection">
                <div className="profile_image">
                    <img src={myprofile_image} alt="profile"/>
                    <input type="file" onChange={handleImageChange} id="image_uploadInput" />
                </div>


                <div className="inputContainer">
                <lable className="input_text">
                    이름
                </lable>

                <div
                    className="inputWrap"
                >
                    <input
                        className="input"
                        type="text"
                        placeholder="이름을 입력해주세요"
                        value={name}
                        /*onChange={handleName}*/
                    />
                </div>

                <div className="input_text">
                    닉네임
                </div>

                <div
                    className="inputWrap"
                >
                    <input
                        className="input"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        value={nickname}
                        /*onChange={handleNickname}*/
                    />
                </div>

                <div className="input_text">
                    자기소개
                </div>

                <div
                    className="inputWrap"
                >
                    <input
                        className="input"
                        type="text"
                        placeholder="자기소개를 입력해주세요"
                        value={nickname}
                       /* onChange={handleNickname}*/
                    />
                </div>

                <div className="input_text">
                    연령대
                </div>

                <form className={`age-group-form ${ageGroup}`}>
                    <label>
                        <input
                            type="radio"
                            value="10s"
                            checked={ageGroup === '10s'}
                            onChange={handleAgeGroupChange}
                        />
                        10대
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="20s"
                            checked={ageGroup === '20s'}
                            onChange={handleAgeGroupChange}
                        />
                        20대
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="30s"
                            checked={ageGroup === '30s'}
                            onChange={handleAgeGroupChange}
                        />
                        30대
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="40s-50s"
                            checked={ageGroup === '40s-50s'}
                            onChange={handleAgeGroupChange}
                        />
                        40대-50대
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="60s and above"
                            checked={ageGroup === '60s and above'}
                            onChange={handleAgeGroupChange}
                        />
                        60대 이상
                    </label>
                </form>

                <div className="input_text">
                    내가 좋아하는 축제 유형
                </div>

            </div>
            </div>
            <div className="buttonsSection">
                <button id="likedEvents">찜한행사</button>
                <button id="myPosts">내가 쓴 글</button>
            </div>
            <div id="contentContainer" className="contentContainer">

            </div>
            <div className="modifySection">
                <button id="modifyInfo">수정 완료</button>
                <button id="modifyPassword"><a href="http://localhost:8080/change_pw/"
                                               target="_blank"
                                               rel="noopener noreferrer">비밀번호 수정</a></button>
                <button id="withdraw"><a href="http://localhost:8080/delete/"
                                         target="_blank"
                                         rel="noopener noreferrer">회원탈퇴</a></button>
            </div>
        </div>
    );
}

export default MyPage;