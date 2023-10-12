import { useAuth } from "../Login/AuthProvider";
import './Recommend.css';
import recommancBackground from "../../img/recommand/recommandBackground.jpg";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// 슬라이더를 위한 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 카테고리 이미지
import cultural from "../../img/main/문화예술.png"
import harmony from "../../img/main/주민화합.png"
import traditional from "../../img/main/전통역사.png"
import regional  from "../../img/main/지역특산물.png"
import natural  from "../../img/main/생태자연.png"
import famous from "../../img/main/famous.png";
import cal from "../../img/main/cal.png";
import recommand_click from "../../img/nav/recommend_click.png"

function renderIconAndStyle(category) {
    switch(category) {
        case '문화예술':
            return { icon: cultural, className: 'cultural-class' };
        case '주민화합':
            return { icon: harmony, className: 'harmony-class' };
        case '전통역사':
            return { icon: traditional, className: 'traditional-class' };
        case '지역특산물':
            return { icon: regional, className: 'regional-class' };
        case '생태자연':
            return { icon: natural, className: 'natural-class' };
        default:
            return { icon: null, className: '' };
    }
}


function Recommend() {
    const { isLoggedIn } = useAuth();
    const [festivals, setFestivals] = useState([]);

    const [topFestivals, setTopFestivals] = useState([]);  // 상위 5개 축제
    const [currentMonthFestivals, setCurrentMonthFestivals] = useState([]); // 이번 달 축제
    const [recommendedFestivals, setRecommendedFestivals] = useState([]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [memberId, setMemberId] = useState(null);
    const {userId} = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        // 아이디 추가
        // let memberId = localStorage.getItem("memberId");
        // setMemberId(localStorage.getItem("memberId"));
        // console.log("---------------------------------------");
        console.log('userId', userId);
        setMemberId(userId);
        console.log('memberId', memberId);


        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);


        const fetchTop5 = axios.get('http://localhost:8080/festivals/top5', {
            headers: {'Content-Type': 'application/json'}
        });
        fetchTop5.then((top5Response) => {
            // console.log('top5Response.data', top5Response.data)
            setTopFestivals(top5Response.data);
        })

        const fetchCurrentMonth = axios.get('http://localhost:8080/festivals/currentMonth', {
            headers: {'Content-Type': 'application/json'}
        });
        fetchCurrentMonth.then((currentMonthResponse)=>{
            setCurrentMonthFestivals(currentMonthResponse.data);
        })

        //추천된 축제들을 불러옴
        if( userId != null) {
            const fetchRecommendedFestivals = axios.get(`http://localhost:8080/recommend/festivals?memberId=${userId}`, {
                headers: {'Content-Type': 'application/json'},
                data : userId
            });
            fetchRecommendedFestivals.then((recommendedFestivalsResponse)=>{
                setRecommendedFestivals(recommendedFestivalsResponse.data);
            })
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[userId]);


    const settings = {
        dots: true, // 슬라이더 아래에 도트 표시
        infinite: true, // 무한 반복
        speed: 400, // 애니메이션 속도
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1, // 한 번에 스크롤되는 슬라이드 개수
        autoplay: true,
        autoplaySpeed: 3000
    };

    const settings2 = {
        dots: true, // 슬라이더 아래에 도트 표시
        infinite: true, // 무한 반복
        speed: 400, // 애니메이션 속도
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1, // 한 번에 스크롤되는 슬라이드 개수
        autoplay: false,
        autoplaySpeed: 3000
    };


    return (
        <div className="section">
        <div className="bgWrapper"  >
            <img className="recommancBackground" src={recommancBackground} alt="bg2"  />
            <h3 className="mainText" >당신만을 위한 추천 <br/> 추천할 수 박에</h3>
        </div>{/* 1개 이용시 필요
            <div className="famous_div">
                <div className="famous_text_div">
                    <img className="famous_img"  src={recommand_click} alt="famous_img"/>
                    <span className="famous_text">  당신만을 위한 추천 </span>
                </div>

                <div id="contentContainer" className="contentContainer">
                    <Slider {...settings} className="famous_slider">
                        {recommendedFestivals.map((festival, index) => {
                            // 각 festival 항목에 대해 아이콘과 클래스 정보를 가져옵니다.
                            const { icon, className } = renderIconAndStyle(festival.festival_category);

                            return (
                                <div
                                    key={festival.festival_no}
                                    className="festivalItem">
                                    <div>
                                        <p className="element">
                                            <p className="festival_name"> {index + 1}. {festival.festival_name}</p><br/>
                                            <img src={process.env.PUBLIC_URL + festival.festival_image} alt={festival.festivalName} className="festival_image" onClick={() => window.location.href=`http://localhost:8080/festivalInfo/${festival.festival_no}`}/><br/>
                                            {icon && <img src={icon} alt="category-icon" />}
                                            <p className={`festival_category ${className}`}># {festival.festival_category}</p><br /><br />
                                            <span className="title">📍 상세 내용 <br /></span>
                                            <p className="festival_contents"> {festival.festival_contents}</p>  <br />
                                            <span className="title">🔗 홈페이지 <br /></span>
                                            <a href={festival.festival_homepage} target="_blank" rel="noopener noreferrer" className="festival_homepage">바로가기</a><br /><br />
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>*/}
            <div className="famous_div">
                <div className="famous_text_div">
                    <img className="famous_img" src={recommand_click} alt="famous_img"/>
                    <span className="famous_text">당신만을 위한 추천</span>
                </div>
                <div id="contentContainer" className="contentContainer">

                    {memberId==null ? (
                        <div className="login_text">
                            회원가입 혹은 로그인 해주시면 <br/>
                            관심카테고리 추천 해드립니다!
                            <button className="login_button" onClick={() => navigate('/login')}>로그인</button>
                        </div>
                    ) : (
                        <div className={recommendedFestivals.length < 3 ? "horizontalLayout" : ""}>
                            {recommendedFestivals.length < 3 ? (
                                recommendedFestivals.map((festival, index) => {
                                    const { icon, className } = renderIconAndStyle(festival.festival_category);
                                    return (
                                        <div key={festival.festival_no} className="festivalItem">
                                            <div className="element">
                                                <p className="festival_name"> {index + 1}. {festival.festival_name}</p>
                                                <img src={process.env.PUBLIC_URL + festival.festival_image} alt={festival.festivalName} className="festival_image" onClick={() => window.location.href=`http://localhost:8080/festivalInfo/${festival.festival_no}`}/>
                                                {icon && <img src={icon} alt="category-icon" />}
                                                <p className={`festival_category ${className}`}># {festival.festival_category}</p>
                                                <span className="title">📍 상세 내용</span>
                                                <p className="festival_contents">{festival.festival_contents}</p>
                                                <span className="title">🔗 홈페이지</span><br/>
                                                <a href={festival.festival_homepage} target="_blank" rel="noopener noreferrer" className="festival_homepage">바로가기</a>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <Slider {...settings} className="famous_slider">
                                    {recommendedFestivals.map((festival, index) => {
                                        const { icon, className } = renderIconAndStyle(festival.festival_category);
                                        return (
                                            <div key={festival.festival_no} className="festivalItem">
                                                <div className="element">
                                                    <p className="festival_name"> {index + 1}. {festival.festival_name}</p>
                                                    <img src={process.env.PUBLIC_URL + festival.festival_image} alt={festival.festivalName} className="festival_image" onClick={() => window.location.href=`http://localhost:8080/festivalInfo/${festival.festival_no}`}/><br/>
                                                    {icon && <img src={icon} alt="category-icon" />}
                                                    <p className={`festival_category ${className}`}># {festival.festival_category}</p><br />
                                                    <span className="title">📍 상세 내용</span><br/>
                                                    <p className="festival_contents">{festival.festival_contents}</p> <br/>
                                                    <span className="title">🔗 홈페이지</span> <br/>
                                                    <a href={festival.festival_homepage} target="_blank" rel="noopener noreferrer" className="festival_homepage">바로가기</a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            )}
                        </div>
                    )}
                </div>

            </div>

            <div className="famous_div">
                <div className="famous_text_div">
                    <img className="famous_img"  src={cal} alt="famous_img"/>
                    <span className="famous_text">  이달의 축제 </span>
                </div>

                <div id="contentContainer" className="contentContainer">
                    <Slider {...settings2} className="famous_slider">
                        {currentMonthFestivals.map((festival, index) => {
                            // 각 festival 항목에 대해 아이콘과 클래스 정보를 가져옵니다.
                            const { icon, className } = renderIconAndStyle(festival.festival_category);

                            return (
                                <div
                                    key={festival.festival_no}
                                    className="festivalItem">
                                    <div>
                                        <div className="element">
                                            <p className="festival_name"> {index + 1} {festival.festival_name}</p><br/>
                                            <img src={process.env.PUBLIC_URL + festival.festival_image} alt={festival.festivalName} className="festival_image" onClick={() => window.location.href=`http://localhost:8080/festivalInfo/${festival.festival_no}`}/><br/>
                                            {icon && <img src={icon} alt="category-icon" />}
                                            <p className={`festival_category ${className}`}># {festival.festival_category}</p><br /><br />
                                            <span className="title">📍 상세 내용 <br /></span>
                                            <p className="festival_contents"> {festival.festival_contents}</p>  <br />
                                            <span className="title">🔗 홈페이지 <br /></span>
                                            <a href={festival.festival_homepage} target="_blank" rel="noopener noreferrer" className="festival_homepage">바로가기</a><br /><br />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
            <div className="famous_div">
                <div className="famous_text_div">
                    <img className="famous_img"  src={famous} alt="famous_img"/>
                    <span className="famous_text"> 사람들이 가장 많이 본 인기 축제 TOP 5</span>
                </div>

                <div id="contentContainer" className="contentContainer">
                    <Slider {...settings2} className="famous_slider">
                        {topFestivals.map((festival, index) => {
                            // 각 festival 항목에 대해 아이콘과 클래스 정보를 가져옵니다.
                            const { icon, className } = renderIconAndStyle(festival.festival_category);

                            return (
                                <div
                                    key={festival.festival_no}
                                    className="festivalItem">
                                    <div>
                                        <div className="element">
                                            <p className="festival_name">Top {index + 1}.  {festival.festival_name}</p><br/>
                                            <img src={process.env.PUBLIC_URL + festival.festival_image} alt={festival.festivalName} className="festival_image" onClick={() => window.location.href=`http://localhost:8080/festivalInfo/${festival.festival_no}`}/><br/>
                                            {icon && <img src={icon} alt="category-icon" />}
                                            <p className={`festival_category ${className}`}># {festival.festival_category}</p><br /><br />
                                            <span className="title">📍 상세 내용 <br /></span>
                                            <p className="festival_contents"> {festival.festival_contents}</p>  <br />
                                            <span className="title">🔗 홈페이지 <br /></span>
                                            <a href={festival.festival_homepage} target="_blank" rel="noopener noreferrer" className="festival_homepage">바로가기</a><br /><br />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>


        </div>




    );
}

export default Recommend;