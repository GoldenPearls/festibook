import React, { useEffect, useState } from "react";
import './Home.css';
import styled from "@emotion/styled";
import star from '../img/main/star.png'
import moon from '../img/main/moon.png'
import bg1 from '../img/main/bg1.png'
import bg2 from '../img/main/bg2.png'
import university_img from '../img/main/university_img.png'
import university1 from '../img/main/university1.png'

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

    return (
        <div className="section">
            <div className="bgWrapper" style={{ '--scrollY': scrollY }}>
                <h3 className="mainText" style={{
                    top: `${scrollY * 1}px`,
                    marginRight: `${scrollY * 1.5}px`,
                    marginTop: `${300 + scrollY * 0.3}px`
                }}>
                    기억하고 싶은 축제<br />Festibook과 함께
                </h3>
               {/* <img className="bg2" width={1920} height={1080} src={bg2} alt="bg2" style={{ top: `${scrollY * 0.5}px` }} />*/}
                <img className="bg1" width={1920} height={1080} src={bg1} alt="bg1" style={{ top: `${scrollY * 3}px` }} />
                <img className="star"  src={star} alt="star" style={{
                    left: `${scrollY * 1}px`,
                    bottom: `${scrollY * 1}px`
                }} />
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
                                <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 동구 필문대로 309 조선대학교
                                <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 4일(수) : 신스/마크툽 <br />
                                10월 5일(목) : 김나영/2F 신용재 X 김원주 <br />
                                10월 6일(금) : 프로미스나인 신용재 <br />
                            </p>
                        </div>
                    </div>
                    <div className="university_festival">
                        <span className="university_name">조선대학교</span><br/>
                        <img className="university_img1"  src={university1} alt="university1"/><br/>
                        <div>
                            <p className="element">
                                <span className="title"> 📍 일정  <br /> </span>
                                2023. 10. 04(수) - 2023. 10. 06(금)
                                <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 동구 필문대로 309 조선대학교
                                <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 4일(수) : 신스/마크툽 <br />
                                10월 5일(목) : 김나영/2F 신용재 X 김원주 <br />
                                10월 6일(금) : 프로미스나인 신용재 <br />
                            </p>
                        </div>
                    </div>
                    <div className="university_festival">
                        <span className="university_name">조선대학교</span><br/>
                        <img className="university_img1"  src={university1} alt="university1"/><br/>
                        <div>
                            <p className="element">
                                <span className="title"> 📍 일정  <br /> </span>
                                2023. 10. 04(수) - 2023. 10. 06(금)
                                <br />
                                <span className="title"> 📍 장소   <br /> </span>
                                광주광역시 동구 필문대로 309 조선대학교
                                <br />
                                <span className="title">📍 라인업 <br />  </span>
                                10월 4일(수) : 신스/마크툽 <br />
                                10월 5일(목) : 김나영/2F 신용재 X 김원주 <br />
                                10월 6일(금) : 프로미스나인 신용재 <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;