import React, { useEffect, useState } from "react";
import './Home.css';
import star from '../img/main/star.png'
import moon from '../img/main/moon.png'
import bg1 from '../img/main/bg1.png'
import bg2 from '../img/main/bg2.png'

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
                {/*<img className="moon" src={moon} alt="moon" />*/}
                <h3 className="mainText" style={{
                    top: `${scrollY * 1}px`,
                    marginRight: `${scrollY * 1.5}px`,
                    marginTop: `${300 + scrollY * 0.3}px`
                }}>
                    기억하고 싶은 축제<br />Festibook과 함께
                </h3>
                {/*<img className="bg2" width={1920} height={1080} src={bg2} alt="bg2" style={{ top: `${scrollY * 0.5}px` }} />*/}
                <img className="bg1" width={1920} height={1080} src={bg1} alt="bg1" style={{ top: `${scrollY * 1}px` }} />
                <img className="star"  src={star} alt="star" style={{
                    left: `${scrollY * 0.5}px`,
                    bottom: `${scrollY * 0.5}px`
                }} />
                <div className="divideBox" style={{
                    background: "linear-gradient(to top, rgb(28, 5, 34), transparent)"
                }}>
                </div>
            </div>
        </div>
    );
}

export default Home;