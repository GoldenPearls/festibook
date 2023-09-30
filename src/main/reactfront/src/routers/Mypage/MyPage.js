import { useAuth } from "../Login/AuthProvider";
import React from "react";

function MyPage() {
    const { isLoggedIn } = useAuth();


    return (
        <div>
            추천페이지
        </div>
    );
}

export default MyPage;