import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import authHeroImage from "../../assets/general/AuthBackground.webp";
import altcampWhiteLogo from "../../assets/general/AuthWhiteLogo.svg";
import authStyles from "./auth.module.css";
import mobileLogo from "./../../assets/general/AuthBlackLogo.svg";

export default function Auth() {
  let activeStyle = {
    color: "#6a6ff5",
    fontWeight: "700",
    borderBottom: "4px solid #6a6ff5",
  };

  return (
    <div className={authStyles.container}>
      <div className={authStyles.hero}>
        <div className={authStyles.heroOverlay}>
          <div className={authStyles.heroContent}>
            <img src={altcampWhiteLogo} alt="studyBuddy Logo" className="" />
            <p className="">
              Learning made easy and interesting. Share what you know even as
              you learn what you do not know
            </p>
          </div>
        </div>
        <img src={authHeroImage} alt="hero image of a student" className="" />
      </div>
      <div className={authStyles.authSection}>
        <div className={authStyles.mobileLogo}>
          <img src={mobileLogo} alt="studybuddy mobile logo" className="" />
        </div>

        <div className={authStyles.authContent}>
          <nav className="">
            <NavLink
              to="/account"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="a1"
              end
            >
              REGISTER
            </NavLink>
            <NavLink
              to="/account/login"
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
