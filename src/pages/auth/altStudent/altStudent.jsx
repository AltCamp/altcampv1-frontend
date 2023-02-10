import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import altStudStyle from "./altStudent.module.css";
import authHeroImage from "../../../assets/general/AuthBackground.webp";
import studyBuddyLogo from "../../../assets/general/Authlogo.png";

export default function AltStudent() {

  let activeStyle = {
    borderBottom: "3px solid #212529",
  };

  return (
    <div className={altStudStyle["AltstudentContainer"]}>
      <div className={altStudStyle["AltstudentLeft"]}>
        <div className={altStudStyle["AltstudentImage"]}>
          <img src={authHeroImage} alt="background" />
        </div>
        <div className={altStudStyle["AltstudentLogo"]}>
          <img src={studyBuddyLogo} alt="logo" />
          <p className={altStudStyle["AltstudentParagraph"]}>
            Learning made easy and interesting.Share what you know and learn
            what you don't.
          </p>
        </div>
      </div>
      <div className={altStudStyle["AltstudentRight"]}>
        <div className={altStudStyle["AltstudentNav"]}>
          <ul className={altStudStyle["navigation"]}>
            <li className={altStudStyle["navigationItem"]}>
              <NavLink
                to="/altstudent"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className={altStudStyle["link"]}
                end
              >
                Register
              </NavLink>
            </li>
            <li className={altStudStyle["navigationItem"]}>
              <NavLink
                to="/altstudent/login"
                style={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                className={altStudStyle["link"]}
              >
                LOGIN
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
