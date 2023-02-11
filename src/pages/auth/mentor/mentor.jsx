// import
import React, { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import mentor from "./mentor.module.css";
import logo from "../../../../src/assets/general/Authlogo.png";
import background from "../../../assets/general/AuthBackground.webp";
import mobilelogo from "../../../assets/general/AuthBlackLogo.png";

export default function Mentor() {
  let activeStyle = {
    color: "var(--secondary-clr-lter-blue)",
    borderBottom: "4px solid var(--secondary-clr-lter-blue)",
  };
  return (
    <div className={mentor.container}>
      <div className={mentor.mobilelogo}> <img src={mobilelogo} alt="mobilelogo"/></div>
      <div className={mentor.background}>
        <div className={mentor.backgroundOverlay}>
          <div className={mentor.logo}>
            <img src={logo} alt="logo" />
            <p className={mentor.text}>
              Learning made easy and interesting. Share what you know even as
              you learn what you something new
            </p>
          </div>
        </div>
        <img src={background} alt="hero image of a student" className="" />
      </div>
      <div className={mentor.formGroup}>
        <div className={mentor.navbar}>
          <nav className="">
            <NavLink
              to="/mentor"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              className={mentor.link}
              end
            >
              Register
            </NavLink>
            <NavLink
              to="/mentor/login"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              className={mentor.link}
            >
              Login
            </NavLink>
          </nav>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
