// import
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserLogin from "../../userLogin/login/userLogin";
import "./mentorLogin.module.css";

export default function MentorLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/mentor/login");
  }, []);

  return (
    <div className="container">
      <div className="mentorLogin">
        <UserLogin />
      </div>
    </div>
  );
}
