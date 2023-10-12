import React, { useEffect, useState } from "react";
import './Home.css';
import bg1 from '../img/main/bg1.png'
import university_img from '../img/main/university_img.png'
import university1 from '../img/main/university1.png'
import university2 from '../img/main/university2.png'
import university3 from '../img/main/university3.png'
import famous from '../img/main/famous.png'
import lamp1 from '../img/main/lamp1.png'
import lamp2 from '../img/main/lamp2.png'
import lamp3 from '../img/main/lamp3.png'
import lamp4 from '../img/main/lamp4.png'
import lamp5 from '../img/main/lamp5.png'
import lamp6 from '../img/main/lamp1.png'
import lamp7 from '../img/main/lamp2.png'
import lamp8 from '../img/main/lamp3.png'
import footer_logo from '../img/login/Loginlogo.png'
import github from '../img/main/github.png'
import notion from '../img/main/Notion.png'
import 'aos/dist/aos.css';
import axios from "axios";
// 슬라이더를 위한 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 카테고리 이미지
import cultural from "../img/main/문화예술.png"
import harmony from "../img/main/주민화합.png"
import traditional from "../img/main/전통역사.png"
import regional  from "../img/main/지역특산물.png"
import natural  from "../img/main/생태자연.png"


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

function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [festivals, setFestivals] = useState([]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/festivals/top5',
            headers: {'Content-Type': 'application/json' }
        };

        axios.request(config)
            .then((response) => {
                console.log('festivals======>',JSON.stringify(response.data));

                setFestivals(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const lamps = [
        { img: lamp1, position: { top: '0%', left: '5%' } },
        { img: lamp2, position: { top: '0%', right: '15%' } },
        { img: lamp2, position: { top: '10%', right: '10%' } },
        { img: lamp3, position: { top: '20%', left: '15%' } },
        { img: lamp4, position: { top: '40%', right: '5%' } },
        { img: lamp5, position: { top: '50%', left: '20%' } },
        { img: lamp6, position: { top: '60%', right: '15%' } },
        { img: lamp7, position: { top: '70%', left: '10%' } },
        { img: lamp8, position: { top: '80%', right: '20%' } },
        { img: lamp1, position: { top: '15%', left: '30%' } },
        { img: lamp2, position: { top: '25%', right: '30%' } },
        { img: lamp3, position: { top: '35%', left: '20%' } },
        { img: lamp4, position: { top: '45%', right: '35%' } },
        { img: lamp5, position: { top: '55%', left: '30%' } },
        { img: lamp6, position: { top: '65%', right: '40%' } },
        { img: lamp7, position: { top: '80%', left: '5%' } },
        { img: lamp8, position: { top: '85%', right: '3%' } },
    ];

    const settings = {
        dots: true, // 슬라이더 아래에 도트 표시
        infinite: true, // 무한 반복
        speed: 400, // 애니메이션 속도
        slidesToShow: isMobile ? 1 : 3,
        slidesToScroll: 1, // 한 번에 스크롤되는 슬라이드 개수
        autoplay: true,
        autoplaySpeed: 3000
    };


    return (
        <div className="section">

            <div className="bgWrapper" style={{ '--scrollY': scrollY }} >
                <img className="bg1" src={bg1} alt="bg2" style={{ top: `${scrollY * 0.5}px` }} />
                <h3 className="mainText" style={{
                    top: `${scrollY * 1}px`,
                    marginRight: `${scrollY * 1.5}px`,
                    marginTop: `${200 + scrollY * 0.3}px`,
                    zIndex: 10
                }}>기억하고 싶은 축제<br />Festibook과 함께 <br /> (스크롤을 내려주세요!)</h3>

                {lamps.map((lamp, index) => (
                    <img
                        key={index}
                        className="lamp"
                        src={lamp.img}
                        alt={`Lamp ${index}`}
                        style={{
                            ...lamp.position,
                            top: `calc(${lamp.position.top} + ${scrollY * 0.5}px)`,
                            animationDuration: `${2 + index % 2}s`,
                        }}
                    />
                ))}

            </div>

            <div className="university_div">
                <div className="university_text_div">
                <img className="university_img"  src={university_img} alt="university_img"/>
                    <span className="university_text"> 10월의 대학 축제</span>
                </div>

                <div className="university_ex">
                    {isMobile ?( <Slider {...settings} className="famous_slider">
                    <div className="university_festival">
                        <span className="university_name">조선대학교</span><br/>
                        <img className="university_img1"  src={university1} alt="university1"/><br/>
                        <div>
                            <p className="element">
                               <span className="title"> 📍 일정  <br /> </span>
                                   2023. 10. 04(수) - 2023. 10. 06(금) 18:00
                                <br /> <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 동구 필문대로 309 조선대학교
                                <br /> <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 4일(수) : 신스/마크툽 <br />
                                10월 5일(목) : 김나영/2F 신용재 X 김원주 <br />
                                10월 6일(금) : 프로미스나인 신용재 <br /><br />
                                <span className="title">📍 관련 인스타 그램 <br />  </span>
                                <a href="https://instagram.com/chosun_36th?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">조선대학교 인스타 바로가기</a>
                            </p>
                        </div>
                    </div>
                    <div className="university_festival">
                        <span className="university_name">호남대학교</span><br/>
                        <img className="university_img2"  src={university2} alt="university2"/><br/>
                        <div>
                            <p className="element">
                                <span className="title"> 📍 일정  <br /> </span>
                                2023. 10. 10(화) - 2023. 10. 12(목)
                                <br /> <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 광산구 호남대길 120 호남대학교
                                <br /> <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 10일(화) : 전상근 <br />
                                10월 11일(수) : 비와이 <br />
                                10월 12일(목) : 최예나 <br /><br />
                                <span className="title">📍 관련 인스타 그램 <br />  </span>
                                <a href="https://instagram.com/honam_neul_37th?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">호남대학교 인스타 바로가기</a>
                            </p>
                        </div>
                    </div>
                    <div className="university_festival">
                        <span className="university_name">광주대학교</span><br/>
                        <img className="university_img3"  src={university3} alt="university3"/><br/>
                        <div>
                            <p className="element">
                                <span className="title"> 📍 일정  <br /> </span>
                                2023. 10. 11(수) - 2023. 10. 12(목)
                                <br /> <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 남구 효덕로 277 광주대학교
                                <br /> <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 11일(수) : 하하&스컬 <br />
                                10월 12일(목) : 청하, 케이시 <br /><br />
                                <span className="title">📍 관련 인스타 그램 <br /><br />  </span>
                                <a href="https://instagram.com/honam_neul_37th?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">광주대학교 인스타 바로가기</a>
                            </p>
                        </div>
                    </div>
                    </Slider>):(
                        <>
                        <div className="university_festival">
                            <span className="university_name">조선대학교</span><br/>
                            <img className="university_img1"  src={university1} alt="university1"/><br/>
                            <div>
                                <p className="element">
                                    <span className="title"> 📍 일정  <br /> </span>
                                    2023. 10. 04(수) - 2023. 10. 06(금) 18:00
                                    <br /> <br />
                                    <span className="title"> 📍 장소   <br /> </span>
                                    광주광역시 동구 필문대로 309 조선대학교
                                    <br /> <br />
                                    <span className="title">📍 라인업 <br />  </span>
                                    10월 4일(수) : 신스/마크툽 <br />
                                    10월 5일(목) : 김나영/2F 신용재 X 김원주 <br />
                                    10월 6일(금) : 프로미스나인 신용재 <br /><br />
                                    <span className="title">📍 관련 인스타 그램 <br />  </span>
                                    <a href="https://instagram.com/chosun_36th?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">조선대학교 인스타 바로가기</a>
                                </p>
                            </div>
                        </div>
                        <div className="university_festival">
                            <span className="university_name">호남대학교</span><br/>
                            <img className="university_img2"  src={university2} alt="university2"/><br/>
                            <div>
                                <p className="element">
                                    <span className="title"> 📍 일정  <br /> </span>
                                    2023. 10. 10(화) - 2023. 10. 12(목)
                                    <br /> <br />
                                    <span className="title"> 📍 장소   <br /> </span>
                                    광주광역시 광산구 호남대길 120 호남대학교
                                    <br /> <br />
                                    <span className="title">📍 라인업 <br />  </span>
                                    10월 10일(화) : 전상근 <br />
                                    10월 11일(수) : 비와이 <br />
                                    10월 12일(목) : 최예나 <br /><br />
                                    <span className="title">📍 관련 인스타 그램 <br />  </span>
                                    <a href="https://instagram.com/honam_neul_37th?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">호남대학교 인스타 바로가기</a>
                                </p>
                            </div>
                        </div>
                        <div className="university_festival">
                            <span className="university_name">광주대학교</span><br/>
                            <img className="university_img3"  src={university3} alt="university3"/><br/>
                            <div>
                                <p className="element">
                                    <span className="title"> 📍 일정  <br /> </span>
                                    2023. 10. 11(수) - 2023. 10. 12(목)
                                    <br /> <br />
                                    <span className="title"> 📍 장소   <br /> </span>
                                    광주광역시 남구 효덕로 277 광주대학교
                                    <br /> <br />
                                    <span className="title">📍 라인업 <br />  </span>
                                    10월 11일(수) : 하하&스컬 <br />
                                    10월 12일(목) : 청하, 케이시 <br /><br />
                                    <span className="title">📍 관련 인스타 그램  </span><br/>
                                    <a href="https://instagram.com/honam_neul_37th?igshid=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer">광주대학교 인스타 바로가기</a><br /><br />
                                </p>
                            </div>
                        </div>
                        </>
                        )}
                </div>

            </div>


            {/*<div className="famous_div">
                <div className="famous_text_div">
                    <img className="famous_img"  src={famous} alt="famous_img"/>
                    <span className="famous_text"> 사람들이 가장 많이 본 인기 축제 TOP 5</span>
                </div>

                <div id="contentContainer" className="contentContainer">
                    <Slider {...settings} className="famous_slider">
                        {festivals.map((festival, index) => {
                            // 각 festival 항목에 대해 아이콘과 클래스 정보를 가져옵니다.
                            const { icon, className } = renderIconAndStyle(festival.festival_category);

                            return (
                                <div
                                    key={festival.festival_no}
                                    className="festivalItem">
                                    <div>
                                        <p className="element">
                                            <p className="festival_name">Top {index + 1}  {festival.festival_name}</p><br/>
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
                    <div className={`footer ${isMobile ? 'mobile' : ''}`}>
                        <div className="footer-logo">
                            <img className="footer_logo" src={footer_logo} alt="footer_logo" />
                        </div>

                        <div className="footer-links">
                            <div className="info-links">
                                <a href="/team-introduction">조원 소개</a>
                                <a href="https://incredible-gem-98e.notion.site/in4mation-festibook-844ae8d62e784c8d82f374a03277f523?pvs=4">사이트 소개</a>
                            </div>
                            <div className="social-links">
                                <span>Link </span>
                                <div className="icons">
                                    <a href="https://github.com/GoldenPearls/festibook"><img className="github" src={github} alt="github" /></a>
                                    <a href="https://incredible-gem-98e.notion.site/in4mation-festibook-844ae8d62e784c8d82f374a03277f523?pvs=4"><img className="notion" src={notion} alt="notion" /></a>
                                </div>
                            </div>
                        </div>

                        <div className="footer-copyright">
                            © 2023, Festibook의 In4mation. 모든 권리 보유.
                        </div>
                    </div>
            </div>



    );
}

export default Home;