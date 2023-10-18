import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Community() {

    useEffect(() => {
        window.location.href = "http://61.97.187.120:8080/board/openBoardList.do";
    }, []);

    return null;

}

export default Community;