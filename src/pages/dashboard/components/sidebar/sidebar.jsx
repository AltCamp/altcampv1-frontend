import sidebarStyle from "./sidebar.module.css";
import darkLogo from "../../../../assets/general/AuthBlackLogo.png";
import { NavLink } from "react-router-dom";

// import link icons
import bookmark from "../../../../assets/icons/bookmark.svg";
import circle from "../../../../assets/icons/circle.svg";
import community from "../../../../assets/icons/community.svg";
import feed from "../../../../assets/icons/feed.svg";
import topics from "../../../../assets/icons/topics.svg";
import contributors from "../../../../assets/icons/contributors.svg";
import settings from "../../../../assets/icons/settings.svg";
import profile from "../../../../assets/icons/profile.svg";
import notification from "../../../../assets/icons/notification.svg";
import quiz from "../../../../assets/icons/quiz.svg";
import resources from "../../../../assets/icons/resources.svg";
import search from "../../../../assets/icons/search.svg";

export default function Sidebar() {
  let activeStyle = {
    color: "#6a6ff5",
    fontWeight: "700",
    borderBottom: "4px solid #6a6ff5",
  };

  return (
    <div className={sidebarStyle.container}>
      <img src={darkLogo} alt="" className="" />
      <nav className={sidebarStyle.nav}>
        <div className={sidebarStyle.navGroup}>
          <h2>OVERVIEW</h2>
          <div className="">
            <NavLink
              to="/feed"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={feed} alt="" className="" />
              Feed
            </NavLink>
            <NavLink
              to="/community"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={community} alt="" className="" />
              Community
            </NavLink>
            <NavLink
              to="/topics"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={topics} alt="" className="" />
              Topics
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={bookmark} alt="" className="" />
              Bookmarks
            </NavLink>
          </div>
        </div>
        <div className={sidebarStyle.navGroup}>
          <h2>LEARNING</h2>
          <div className="">
            <NavLink
              to="/circle"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={circle} alt="" className="" />
              Learning Circle
            </NavLink>
            <NavLink
              to="/resources"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={resources} alt="" className="" />
              Learning Resources
            </NavLink>
            <NavLink
              to="/contributors"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={contributors} alt="" className="" />
              Contributors
            </NavLink>
            <NavLink
              to="/quiz"
              className={sidebarStyle.link}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <img src={quiz} alt="" className="" />
              Quiz
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
