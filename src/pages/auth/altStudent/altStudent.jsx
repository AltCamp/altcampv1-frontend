import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import altStudStyle from "./altStudent.module.css";
import authHeroImage from "../../../assets/general/AuthBackground.webp";
import studyBuddyLogo from "../../../assets/general/Authlogo.png";

export default function AltStudent() {

  let activeStyle = {
    borderBottom: "4px solid var(--secondary-clr-lter-blue)",
    color: "var(--secondary-clr-lter-blue)"
  };

  return (
    <div className={altStudStyle["altstudentContainer"]}>
      <div className={altStudStyle["altstudentLeft"]}>
        <div className={altStudStyle["altstudentImage"]}>
          <img src={authHeroImage} alt="background" />
        </div>
        <div className={altStudStyle["altstudentLogo"]}>
          <img src={studyBuddyLogo} alt="logo" />
          <p className={altStudStyle["altstudentParagraph"]}>
            Learning made easy and interesting.Share what you know and learn
            what you don't.
          </p>
        </div>
      </div>
      <div className={altStudStyle["altstudentRight"]}>
        <div className={altStudStyle["altstudentNav"]}>
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
