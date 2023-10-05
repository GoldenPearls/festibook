// 토큰을 페이지 전역을 관리하기 위한 코드
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        console.log('초기 토큰:', localStorage.getItem('jwt'));
        //로컬에 저장
        return localStorage.getItem('jwt');
    });
    const [isLoggedIn, setIsLoggedIn] = useState(!!token); // 로그인 상태를 관리합니다.
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        console.log('토큰 변경됨:', token);
        if (token) {

            localStorage.setItem('jwt', token);

            setIsLoggedIn(true);
        } else {
            localStorage.removeItem('jwt');
            setIsLoggedIn(false);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn, userId, setUserId  }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};



