import React, { useState } from 'react';
import "./MyPage.css";
import myprofile_image from '../../img/mypage/userprofile.png'
import {useAuth} from "../Login/AuthProvider";
import axios from "axios";

function MyPage() {
    const [profileImage, setProfileImage] = useState(myprofile_image); // 초기 이미지 설정
    const [ageGroup, setAgeGroup] = useState(""); //연령별 그룹 관리
    const [category, setCategory] = useState(""); //카테고리 관리
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [introduce, setIntroduce] = useState(""); // 자기소개 상태 관리


    // useAuth 훅을 통해 토큰 정보를 가져온다.
    const { token } = useAuth();


    /* // 토큰이 있다면 디코딩하여 memberId를 추출
     let memberId;
     if (token) {
         const decodedToken = jwt.decode(token);  // jwt 라이브러리를 사용하여 토큰을 디코딩
         memberId = decodedToken.sub;  // "sub" 필드에서 memberId를 가져온다.
     }

     const formData = new FormData();
     formData.append("memberId", memberId);*/

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

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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

                    <div className="input_text">
                        이름
                    </div>

                    <div
                        className="inputWrap"
                    >
                        <input
                            className="input"
                            type="text"
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
                            value={introduce}
                            /*onChange={handleNickname}*/
                        />
                    </div>

                    <div className="input_text">
                        연령대
                    </div>

                    <form className={`age-group-form ${ageGroup}`}>
                        <label className="radio">
                            <input
                                type="radio"
                                value="10s"
                                checked={ageGroup === '10s'}
                                onChange={handleAgeGroupChange}
                            />
                            &nbsp;10대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="20s"
                                checked={ageGroup === '20s'}
                                onChange={handleAgeGroupChange}
                            />
                            &nbsp;20대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="30s"
                                checked={ageGroup === '30s'}
                                onChange={handleAgeGroupChange}
                            />
                            &nbsp;30대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="40s-50s"
                                checked={ageGroup === '40s-50s'}
                                onChange={handleAgeGroupChange}
                            />
                            &nbsp;40대-50대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="s60_PLUS"
                                checked={ageGroup === 's60_PLUS'}
                                onChange={handleAgeGroupChange}
                            />
                            &nbsp;60대 이상
                        </label>
                    </form>

                    <div className="input_text">
                        내가 관심있는 축제 카테고리
                    </div>

                    <form className={`category-form ${category}`}>
                        <label className="radio">
                            <input
                                type="radio"
                                value="culture"
                                checked={category === 'culture'}
                                onChange={handleCategoryChange}
                            />
                            &nbsp;문화예술
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="harmony among residents"
                                checked={category === 'harmony'}
                                onChange={handleCategoryChange}
                            />
                            &nbsp;주민화합
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="traditional"
                                checked={category === 'traditional'}
                                onChange={handleCategoryChange}
                            />
                            &nbsp;전통역사
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="local_specialty"
                                checked={category === 'local_specialty'}
                                onChange={handleCategoryChange}
                            />
                            &nbsp;지역특산물
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="nature"
                                checked={category === 'nature'}
                                onChange={handleCategoryChange}
                            />
                            &nbsp;생태자연
                        </label>
                    </form>

                </div>
            </div>
            <div className="buttonsSection">
                <button id="likedEvents">찜한행사</button>
                <button id="myPosts">내가 쓴 글</button>
            </div>
            <div id="contentContainer" className="contentContainer">

            </div>
            <div className="modifySection">
                <button id="modifyInfo">수정하기</button>
                <button id="modifyPassword"><a href="http://localhost:8080/change_pw/"
                                               rel="noopener noreferrer">비밀번호 수정</a></button>
                <button id="withdraw"><a href="http://localhost:8080/delete/"
                                         rel="noopener noreferrer">회원탈퇴</a></button>
            </div>
        </div>
    );
}

export default MyPage;