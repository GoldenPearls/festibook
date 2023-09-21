import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "./Navigation.css";
import logoImage from '../../img/nav/logo.png';
import home from '../../img/nav/home.png';
import home_click from '../../img/nav/home_click.png';
import recommend from '../../img/nav/recommend.png';
import recommend_click from '../../img/nav/recommend_click.png';
import fireworks from '../../img/nav/fireworks.png';
import fireworks_click from '../../img/nav/fireworks_click.png';
import communication from '../../img/nav/communication.png';
import communication_click from '../../img/nav/communication_click.png';

import { useMediaQuery } from 'react-responsive'

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
}
const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 })
    return isNotMobile ? children : null
}

function Navigation() {
    const location = useLocation();
    const isActive = path => location.pathname === path;
    return (
        <div className="nav">
            <Default>
                <>
                <Link to="/" className="home-link">
                    <img src={logoImage} alt="Home Logo" className="home-logo"/></Link> <br></br>
                <Link to="/recommend" className={`recommend-link ${isActive("/recommend") ? "active" : ""}`}>추천할 수 박에</Link> <br></br>
                <Link to="/festival" className={`festival-link ${isActive("/festival") ? "active" : ""}`}>축제/행사 소개</Link> <br></br>
                <Link to="/community" className={`community-link ${isActive("/community") ? "active" : ""}`}>너와 나의 연결고리</Link> <br></br>
                <Link to="/login" className="login-btn">Login</Link>
                </>
            </Default>

            <Mobile>
                <>
                    <Link to="/" className="home-link_mobile">
                        <img src={isActive("/")? home_click : home} alt="Home Logo" className="home-mobile-nonclick"/><br/>홈</Link> <br></br>
                    <Link to="/recommend" className="recommend-mobile"> <img src={isActive("/recommend")? recommend_click : recommend} alt="recommend Logo" className="recommend"/><br/>추천 할 수 박에</Link> <br></br>
                    <Link to="/festival" className="festival-mobile"><img src={isActive("/festival")? fireworks_click : fireworks} alt="fireworks Logo" className="fireworks"/><br/>축제/행사 소개</Link> <br></br>
                    <Link to="/community" className="community-mobile"> <img src={isActive("/community")? communication_click : communication} alt="communication Logo" className="communication"/><br/>너와 나의 연결고리</Link> <br></br>
                    <Link to="/login" className="login-btn">Login</Link>
                </>
            </Mobile>
        </div>
    );
}
export default Navigation;