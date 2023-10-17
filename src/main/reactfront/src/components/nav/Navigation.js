import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate} from 'react-router-dom';
import "./Navigation.css";
import logoImage from '../../img/nav/logo.png';
import home from '../../img/nav/home1.png';
import home_click from '../../img/nav/home_click1.png';
import recommend from '../../img/nav/recommend.png';
import recommend_click from '../../img/nav/recommend_click.png';
import fireworks from '../../img/nav/fireworks.png';
import fireworks_click from '../../img/nav/fireworks_click.png';
import communication from '../../img/nav/communication.png';
import communication_click from '../../img/nav/communication_click.png';
import myprofile from '../../img/nav/myprofile1.png'
import { useAuth } from '../../routers/Login/AuthProvider'
import { toast } from 'react-toastify';
// react-toastify 제공하는 css
import 'react-toastify/dist/ReactToastify.css';

import { useMediaQuery } from 'react-responsive'
import myprofile_image from "../../img/nav/myprofile.png";
import axios from "axios";

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
}
const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 })
    return isNotMobile ? children : null
}

function Navigation() {
    const [profileImage, setProfileImage] = useState(myprofile_image); // 초기 이미지 설정
    const location = useLocation();
    const navigate = useNavigate();
    /*const { token, setToken } = useAuth();*/
    const auth = useAuth();


    // console.log('Navigation에서의 토큰:', auth.token);
    const isActive = path => location.pathname === path;



    // 탭 관리를 위한 상태 변수
    const [isTabOpen, setIsTabOpen] = useState(false);

    const handleTabToggle = () => setIsTabOpen(!isTabOpen); // 상태 변수 토글 함수


    useEffect(() => {
        // token 값이 변하면 이 useEffect는 재실행됩니다.
        // console.log('Navigation 컴포넌트에서 토큰 변화 감지:', auth.token);

        // let memberId = auth.userId;
        let memberId = localStorage.getItem("memberId");
        // console.log('1.============================');
        if( !memberId ) return;

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/mypage/${memberId}/image`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        };

        axios.request(config)
            .then((response) => {
                // console.log(response.data);
                if (!response.data) {
                    setProfileImage(myprofile_image);
                }
                else {
                    setProfileImage("http://localhost:8080/uploadimg/"+response.data); // 배포시 스프링주소로 바꿔야함
                }
            })
            .catch((error) => {
                console.log(error);
            });


    });

    const handleLogout = () => {
        console.log("----------------------------------------------- logout !!!!!!!!!!")
        auth.setToken(null); // 로그아웃 시 토큰 제거
        auth.setUserId(undefined);
        localStorage.removeItem('jwt');
        localStorage.removeItem('memberId');

        navigate('/login');
        toast.success('로그아웃에 성공했습니다.');
    }

    return (
        <div className="nav">
            <Default>
                <>
                    <Link to="/" className="home-link">
                        <img src={logoImage} alt="Home Logo" className="home-logo"/></Link> <br></br>
                    <Link to="/recommend" className={`recommend-link ${isActive("/recommend") ? "active" : ""}`}>추천할 수 박에</Link> <br></br>
                    <Link to="/festival" className={`festival-link ${isActive("/festival") ? "active" : ""}`}>축제/행사 소개</Link> <br></br>
                    <Link to="/community" className={`community-link ${isActive("/community") ? "active" : ""}`}>너와 나의 연결고리</Link> <br></br>


                    {/*   <Link to="/login" className="login-btn">Login</Link>*/}
                    {auth.token ? (
                        <div className="mypage_setting">
                            <div className="mypage-btn" onClick={handleTabToggle}>
                                <img src={profileImage} alt="My Profile" className="mypage" />
                            </div>
                            {isTabOpen && (
                                <div className="bottom-tab">
                                    <Link to="/mypage" className="mypage-btn" onClick={() => setIsTabOpen(false)}>마이페이지</Link>
                                    <div className="logout_text"onClick={() => {
                                        handleLogout();
                                        setIsTabOpen(false);
                                    }}>로그아웃</div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="login-btn">
                            Login</Link>
                    )
                    }
                </>
            </Default>

            <Mobile>
                <>
                    <Link to="/" className="home-link_mobile">
                        <img src={isActive("/")? home_click : home} alt="Home Logo" className="home-mobile-nonclick"/><br/>홈</Link> <br></br>
                    <Link to="/recommend" className="recommend-mobile"> <img src={isActive("/recommend")? recommend_click : recommend} alt="recommend Logo" className="recommend"/><br/>추천 할 수 박에</Link> <br></br>
                    <Link to="/festival" className="festival-mobile"><img src={isActive("/festival")? fireworks_click : fireworks} alt="fireworks Logo" className="fireworks"/><br/>축제/행사 소개</Link> <br></br>
                    <Link to="/community" className="community-mobile"> <img src={isActive("/community")? communication_click : communication} alt="communication Logo" className="communication"/><br/>너와 나의 연결고리</Link> <br></br>
                    {auth.token ? (
                        <>
                            <div className="mypage_setting">
                                <div className="mypage-btn" onClick={handleTabToggle}>
                                    <br/><img src={profileImage} alt="My Profile" className="mypage" /> <br/><p className="mypage_text">마이페이지</p><br></br>
                                </div>
                                {isTabOpen && (
                                    <div className="bottom-tab">
                                        <Link to="/mypage" className="mypage-btn" onClick={() => setIsTabOpen(false)}>마이페이지</Link>
                                        <div className="logout_text" onClick={() => {
                                            handleLogout();
                                            setIsTabOpen(false);
                                        }}>로그아웃</div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link to="/login" className="login-btn">Login</Link>
                    )
                    }
                </>
            </Mobile>
        </div>
    );
}
export default Navigation;