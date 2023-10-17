<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

function Festival() {
    useEffect(() => {
        window.location.href = "http://localhost:8080/festival";
    }, []);

    return null;
=======
import React from "react";
import { useNavigate } from "react-router-dom";

const Festival = (props) => {
  const navigate = useNavigate();

   return (
      <p>
        <button onClick={() => navigate("/calendar")}>Go to Calendar</button>
      </p>
   );
>>>>>>> calendarFDetail_ch
}

export default Festival;