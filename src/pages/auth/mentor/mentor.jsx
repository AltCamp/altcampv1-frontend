// import
import React, { useEffect } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import "./mentor.css";
import MentorLogin from "./mentorLogin/mentorLogin";
import MentorRegister from "./mentorRegister/mentorRegister";
import logo from "../../../../src/assets/general/Authlogo.png";

export default function Mentor() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/mentor/register");
  }, []);
  let activeStyle = {
        borderBottom: "2px solid var(--neutral-clr-deep-grey)",
  };
  return (
    <div className="mentorContainer">
      <div className="mentorBackground">
        <div className="mentorLogo container">
          <img src={logo} alt="logo" />
          <p className="mentorText">
            Learning made easy and interesting.Share what you know and learn
            what you don't.
          </p>
        </div>
      </div>
      <div className="mentorForm">
        <div className="mentorNavbar">
          <ul className="nav">
            <li className="navItem">
              <NavLink
                to="/mentor/register"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className="link">
                Register
                </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                to="/mentor/login"
                style={({ isActive }) => {  
                  return isActive ? activeStyle : null;
                }}
                className="link">
                Login
                </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
