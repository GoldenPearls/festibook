import React, { useEffect, useState } from "react";
import './Home.css';
import styled from "@emotion/styled";
import moon from '../img/main/moon.png'
import bg1 from '../img/main/bg1.png'
import bg2 from '../img/main/bg2.png'
import university_img from '../img/main/university_img.png'
import university1 from '../img/main/university1.png'
import university2 from '../img/main/university2.png'
import university3 from '../img/main/university3.png'
import famous from '../img/main/famous.png'
import cloud from '../img/main/cloud.png'
import lamp1 from '../img/main/lamp1.png'
import lamp2 from '../img/main/lamp2.png'
import lamp3 from '../img/main/lamp3.png'
import lamp4 from '../img/main/lamp4.png'
import lamp5 from '../img/main/lamp5.png'
import lamp6 from '../img/main/lamp1.png'
import lamp7 from '../img/main/lamp2.png'
import lamp8 from '../img/main/lamp3.png'
import firework1 from '../img/main/fireworks1.png'
import firework2 from '../img/main/fireworks2.png'
import 'aos/dist/aos.css';

function Home() {
    const [scrollY, setScrollY] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const lamps = [
        { img: lamp1, position: { top: '10%', left: '10%' } },
        { img: lamp2, position: { top: '10%', right: '10%' } },
        { img: lamp3, position: { top: '30%', left: '30%' } },
        { img: lamp4, position: { top: '30%', right: '20%' } },
        { img: lamp5, position: { top: '60%', left: '25%' } },
        { img: lamp6, position: { top: '60%', right: '30%' } },
        { img: lamp7, position: { top: '80%', left: '30%' } },
        { img: lamp8, position: { top: '90%', right: '25%' } },
    ];


    return (
        <div className="section">

            <div className="bgWrapper" style={{ '--scrollY': scrollY }}>
            <img className="bg1" width={1920} height={1200} src={bg1} alt="bg2" style={{ top: `${scrollY * 0.5}px` }} />
                <h3 className="mainText" style={{
                    top: `${scrollY * 1}px`,
                    marginRight: `${scrollY * 1.5}px`,
                    marginTop: `${300 + scrollY * 0.3}px`,
                    zIndex: 10 // 다른 요소보다 위에 나타나게 하려면 z-index 값을 높게 설정
                }}>기억하고 싶은 축제<br />Festibook과 함께</h3>
            <img className="moon" src={moon} alt="Moon" style={{ top: `${20 + scrollY * 0.5}px` }} />
            <img className="cloud" src={cloud} alt="Cloud" style={{ left: '30%', top: `${70 + scrollY * 0.5}px` }} />
            <img className="cloud" src={cloud} alt="Cloud" style={{ right: '30%', top: `${70 + scrollY * 0.5}px` }} />
            {lamps.map((lamp, index) => (
                <img
                    key={index}
                    className="lamp"
                    src={lamp.img}
                    alt={`Lamp ${index}`}
                    style={{
                        ...lamp.position,
                        top: `calc(${lamp.position.top} + ${scrollY * 0.5}px)`,
                    }}
                />
            ))}
                <img className="firework1" src={firework1} alt="firework1" style={{  left: '20%', top: `${20 + scrollY * 0.5}px` }} />
                <img className="firework2" src={firework2} alt="firework2" style={{  right: '10%', top: `${20 + scrollY * 0.5}px` }} />
                <div className="divideBox" style={{
                    background: "linear-gradient(to top, rgb(28, 5, 34), transparent)"
                }}>
                </div>
            </div>

            <div className="university_div">
                <div className="university_text_div">
                <img className="university_img"  src={university_img} alt="university_img"/>
                    <span className="university_text"> 10월의 대학 축제</span>
                </div>
                <div className="university_ex">
                    <div className="university_festival">
                        <span className="university_name">조선대학교</span><br/>
                        <img className="university_img1"  src={university1} alt="university1"/><br/>
                        <div>
                            <p className="element">
                               <span className="title"> 📍 일정  <br /> </span>
                                   2023. 10. 04(수) - 2023. 10. 06(금)
                                <br /> <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 동구 필문대로 309 조선대학교
                                <br /> <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 4일(수) : 신스/마크툽 <br />
                                10월 5일(목) : 김나영/2F 신용재 X 김원주 <br />
                                10월 6일(금) : 프로미스나인 신용재 <br />
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
                                10월 12일(목) : 최예나 <br />
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
                            </p>
                        </div>
                    </div>
                    <div className="university_festival">
                        <span className="university_name">충남대학교</span><br/>
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
                                10월 11일(수) : 미정 <br />
                                10월 12일(목) : 미정 <br /><br />
                            </p>
                        </div>
                    </div>
                    <div className="university_festival">
                        <span className="university_name">충남대학교</span><br/>
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
                                10월 11일(수) : 미정 <br />
                                10월 12일(목) : 미정 <br /><br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="famous_div">
                <div className="famous_text_div">
                    <img className="famous_img"  src={famous} alt="famous_img"/>
                    <span className="famous_text"> 사람들이 가장 많이 눌러본 인기 축제 </span>
                </div>
            </div>
        </div>



    );
}

export default Home;