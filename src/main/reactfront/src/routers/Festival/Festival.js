import React from "react";
import { useNavigate } from "react-router-dom";

const Festival = (props) => {
  const navigate = useNavigate();

   return (
      <p>
        <button onClick={() => navigate("/calendar")}>Go to Calendar</button>
      </p>
   );
}

export default Festival;