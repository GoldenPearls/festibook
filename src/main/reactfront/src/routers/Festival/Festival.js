import React, { useState, useEffect } from 'react';

function Festival() {
    useEffect(() => {
        window.location.href = "http://61.97.187.120:8080/festival";
    }, []);

    return null;
}

export default Festival;