import { useAuth } from "../Login/AuthProvider";
import React from "react";
import './Recommend.css';
import recommancBackground from "../../img/recommand/recommandBackground.jpg";



function Recommend() {
    const { isLoggedIn } = useAuth();


    return (
        <div className="bgWrapper"  >
            <img className="recommancBackground" src={recommancBackground} alt="bg2"  />
            <h3 className="mainText" >당신만을 위한 추천 <br/> 추천할 수 박에</h3>

        </div>
    );
}

export default Recommend;