import layoutStyles from "./layout.module.css";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar/topbar";
import Sidebar from "../components/sidebar/sidebar";

export default function Layout() {
  return (
    <div className={layoutStyles.container}>
      <Sidebar />
      <div className={layoutStyles.sectionTwo}>
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}
