import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import authHeroImage from "../../../assets/general/AuthBackground.webp";
import studyBuddyLogo from "../../../assets/general/Authlogo.png";
import rglrStudStyle from "./regularStudent.module.css";
import mobileLogo from "./../../../assets/general/AuthBlackLogo.png";

export default function RegularStudent() {
  let activeStyle = {
    color: "#6a6ff5",
    fontWeight: "700",
    borderBottom: "4px solid #6a6ff5",
  };

  return (
    <div className={rglrStudStyle.container}>
      <div className={rglrStudStyle.hero}>
        <div className={rglrStudStyle.heroOverlay}>
          <div className={rglrStudStyle.heroContent}>
            <img src={studyBuddyLogo} alt="studyBuddy Logo" className="" />
            <p className="">
              Learning made easy and interesting. Share what you know even as
              you learn what you something new
            </p>
          </div>
        </div>
        <img src={authHeroImage} alt="hero image of a student" className="" />
      </div>
      <div className={rglrStudStyle.authSection}>
        <div className={rglrStudStyle.mobileLogo}>
          <img src={mobileLogo} alt="studybuddy mobile logo" className="" />
        </div>

        <div className={rglrStudStyle.authContent}>
          <nav className="">
            <NavLink
              to="/regularstudent"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="a1"
              end
            >
              REGISTER
            </NavLink>
            <NavLink
              to="/regularstudent/login"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="a2"
            >
              LOGIN
            </NavLink>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
