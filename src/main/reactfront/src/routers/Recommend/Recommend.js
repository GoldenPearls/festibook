import { useAuth } from "../Login/AuthProvider";
import React from "react";

function Recommend() {
    const { isLoggedIn } = useAuth();


    return (
        <div>
            추천페이지
        </div>
    );
}

export default Recommend;