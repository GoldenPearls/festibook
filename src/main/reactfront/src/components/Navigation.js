import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import logoImage from '../img/logo.png';

function Navigation() {
    return (
        <div className="nav">
            <Link to="/" className="home-link">
                <img src={logoImage} alt="Home Logo"  className="home-logo" />
            </Link> <br></br>
            <Link to="/recommend" className="recommend-link">추천할 수 박에</Link> <br></br>
            <Link to="/festival" className="festival-link">축제/행사 소개</Link> <br></br>
            <Link to="/community" className="community-link">너와 나의 연결고리</Link> <br></br>
            <Link to="/login" className="login-btn">Login</Link>
        </div>
    );
}
export default Navigation;