import React, { useState, useEffect } from 'react';

function Festival() {
    useEffect(() => {
        window.location.href = "http://localhost:8080/festival";
    }, []);

    return null;
}

export default Festival;