import React, { useState, useEffect } from 'react';
import "./MyPage.css";
import myprofile_image from '../../img/mypage/userprofile.png'
import {useAuth} from "../Login/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// react-toastify 제공하는 css
import 'react-toastify/dist/ReactToastify.css';

function MyPage() {
    const [profileImage, setProfileImage] = useState(myprofile_image); // 초기 이미지 설정
    const [ageGroup, setAgeGroup] = useState(""); //연령별 그룹 관리
    const [category, setCategory] = useState(""); //카테고리 관리
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [introduce, setIntroduce] = useState(""); // 자기소개 상태 관리

    const [isEditing, setIsEditing] = useState(false); //편집 모드 상태

    const [message, setMessage] = useState(""); //메세지 상태변수

    // 길이 확인을 위한 핸들러
    const [isNameTooLong, setIsNameTooLong] = useState(false);
    const [isNicknameTooLong, setIsNicknameTooLong] = useState(false);
    const [isIntroduceTooLong, setIsIntroduceTooLong] = useState(false);
    // useAuth 훅을 통해 토큰 정보를 가져온다.
    // const { token } = useAuth();
    const auth = useAuth();

    // 이벤트 길이 확인
    const handleNameChange = (e) => {
        const value = e.target.value;
        setIsNameTooLong(value.length > 10);
        setName(value);
    };

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setIsNicknameTooLong(value.length > 10);
        setNickname(value);
    };

    const handleIntroduceChange = (e) => {
        const value = e.target.value;
        setIsIntroduceTooLong(value.length > 35);
        setIntroduce(value);
    };


    const handleButtonClick = () => {
        if (isEditing) { // 편집모드에서 '저장' 버튼을 클릭했을 때

            // let jwt = localStorage.getItem("jwt");
            // let data1 = parseJwt(jwt);
            // let memberId = data1.sub;
            let memberId = auth.userId;
            if( !memberId ) return;

            let data = JSON.stringify({
                "member_id": memberId,
                "member_name": name,
                "member_nickname": nickname,
                "member_introduce": introduce,
                "ageGroup": ageGroup,
                "category_name": category
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/mypage/updateInfo',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                },
                data : data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });

            toast.success("수정완료되었습니다");
        } else { // '수정하기' 버튼을 클릭했을 때
            setMessage(""); // 메시지 초기화
        }
        setIsEditing(prev => !prev); // 현재 상태를 반전시킴
    }



    useEffect(() => {
        console.log("--------- My Page -------------------------------")
        // let jwt = localStorage.getItem("jwt");
        // if( jwt == undefined) return;
        // let data = parseJwt(jwt);
        // let memberId = data.sub;
        // let memberId = auth.userId;
        // console.log('auth.userId', memberId);
        let memberId = localStorage.getItem("memberId");
        console.log('memberId', memberId);
        if( !memberId ) return;
        console.log("----------------------------------------")
        console.log(memberId);
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/mypage/${memberId}/detail`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            },
            data : memberId
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setName(response.data.member_name);
                setNickname(response.data.member_nickname);
                setIntroduce(response.data.member_introduce);
                setAgeGroup(response.data.ageGroup);
                setCategory(response.data.category_name);
                // setProfileImage("/uploadimg/"+response.data.member_profile_image);
                //setProfileImage("http://localhost:8080/uploadimg/"+response.data.member_profile_image); // 배포시 스프링주소로 바꿔야함
                // 만약 응답 데이터에 member_profile_image가 없거나 null이면 기본 이미지를 사용
                if (!response.data.member_profile_image) {
                    setProfileImage(myprofile_image);
                } else {
                    setProfileImage("http://localhost:8080/uploadimg/"+response.data.member_profile_image); // 배포시 스프링주소로 바꿔야함
                }
            })
            .catch((error) => {
                console.log(error);
            });



    }, []);



    const handleImageChange = (e) => {
        console.log('==========================================222');
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // 이미지 로드가 완료되면 상태를 업데이트합니다.
            }
            reader.readAsDataURL(file); // 파일을 읽어 data URL로 변환합니다.
        }
        let memberId = auth.userId;
        if( !memberId ) return;

        // 서버에 파일 업로드
        let data = new FormData();
        data.append("member_id", memberId);
        data.append('profileImage', file);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/mypage/uploadProfileImage',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'multipart/form-data'
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                if(response.data.success == 'success') {
                    let filename = response.data.data;
                    // let imageUrl = '/uploadimg/' + filename;
                    let imageUrl = 'http://localhost:8080/uploadimg/' + filename; // 배포시 스프링주소로 바꿔야함
                    setProfileImage(imageUrl);
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handleAgeGroupChange = (event) => {
        setAgeGroup(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }




    return (
        <div className="myPage">
            <ToastContainer
                position="top-right"
                limit={1}
                closeButton={false}
                autoClose={3000}
                className="custom-toast-container"
                toastClassName="custom-toast"
            />
            <h2 id="nickname">나의 계정</h2>
            <div className="infoSection">
                <div className="profile_image">
                    <img src={profileImage} alt="profile"/>
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
                            readOnly={!isEditing} // isEditing이 false일 때 readOnly 적용
                            /*onChange={e => setName(e.target.value)}*/
                            onChange={handleNameChange}
                        />

                    </div>

                    <div>
                        {isNameTooLong && <span className="error-message" >이름이 너무 깁니다. 10글자 밑으로 지정해주세요.</span>}
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
                            readOnly={!isEditing} // isEditing이 false일 때 readOnly 적용
                            /*onChange={e => setNickname(e.target.value)}*/
                            onChange={handleNicknameChange}
                        />
                    </div>
                    <div>
                        {isNicknameTooLong&& <span className="error-message">닉네임이 너무 깁니다. 10글자 밑으로 지정해주세요 </span>}

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
                            readOnly={!isEditing} // isEditing이 false일 때 readOnly 적용
                            /*onChange={e => setIntroduce(e.target.value)}*/
                            onChange={handleIntroduceChange}
                        />
                    </div>
                    <div>
                        {isIntroduceTooLong && <span className="error-message" >자기소개글이 너무 깁니다. 35자 밑으로 설정해주세요.</span>}
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
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;10대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="20s"
                                checked={ageGroup === '20s'}
                                onChange={handleAgeGroupChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;20대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="30s"
                                checked={ageGroup === '30s'}
                                onChange={handleAgeGroupChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;30대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="40s-50s"
                                checked={ageGroup === '40s-50s'}
                                onChange={handleAgeGroupChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;40대-50대
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="s60_PLUS"
                                checked={ageGroup === 's60_PLUS'}
                                onChange={handleAgeGroupChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
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
                                value="문화예술"
                                checked={category === '문화예술'}
                                onChange={handleCategoryChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;문화예술
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="주민화합"
                                checked={category === '주민화합'}
                                onChange={handleCategoryChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;주민화합
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="전통역사"
                                checked={category === '전통역사'}
                                onChange={handleCategoryChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;전통역사
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="지역특산물"
                                checked={category === '지역특산물'}
                                onChange={handleCategoryChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;지역특산물
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="생태자연"
                                checked={category === '생태자연'}
                                onChange={handleCategoryChange}
                                disabled={!isEditing} // isEditing이 false일 때 disabled 적용
                            />
                            &nbsp;생태자연
                        </label>
                    </form>

                </div>
            </div>

            {/*{!isEditing && (
                <>
                    <div className="buttonsSection">
                        <button id="myPosts">내가 쓴 글</button>
                    </div>
                    <div id="contentContainer" className="contentContainer">


                    </div>

                </>
            )}*/}
            <div className="modifySection">
                <button id="modifyInfo" onClick={handleButtonClick}
                        disabled={isNameTooLong || isNicknameTooLong || isIntroduceTooLong}
                        style={{
                            backgroundColor: (isNameTooLong || isNicknameTooLong || isIntroduceTooLong) ? 'grey' : '#EC7373'
                        }}
                >{isEditing ? '저장' : '수정하기'}</button>

                {/*편집모드가 아닐 때만 두 버튼 랜더링*/}
                {!isEditing && (
                    <>
                        <button id="modifyPassword"><a href="http://localhost:8080/change_pw/"
                                                       rel="noopener noreferrer">비밀번호 수정</a></button>
                        <button id="withdraw"><a href="http://localhost:8080/delete/"
                                                 rel="noopener noreferrer">회원탈퇴</a></button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyPage;