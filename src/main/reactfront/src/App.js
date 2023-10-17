import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> calendarFDetail_ch
import "./App.css";
import Home from "./routers/Home";
import Festival from "./routers/Festival/Festival";
import Recommend from "./routers/Recommend/Recommend";
import Community from "./routers/Community/Community";
import Navigation from "./components/nav/Navigation";
import Login from "./routers/Login/Login";
<<<<<<< HEAD
import MyPage from "./routers/Mypage/MyPage";
import { AuthProvider } from './routers/Login/AuthProvider'

function App() {
    return (
        <AuthProvider>
=======


function App() {

    return (
    <div className="App">
>>>>>>> calendarFDetail_ch
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/festival" element={<Festival />} />
<<<<<<< HEAD
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;
=======

                <Route path="/recommend" element={<Recommend />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
  </div>

    );
}

export default App;
>>>>>>> calendarFDetail_ch
