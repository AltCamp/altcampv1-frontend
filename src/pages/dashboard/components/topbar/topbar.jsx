import topbarStyles from "./topbar.module.css";

import search from "../../../../assets/icons/search.svg";
import notification from "../../../../assets/icons/notification.svg";
import avatar from "../../../../assets/general/avatar.png"

export default function Topbar() {
  return (
    <div className={topbarStyles.container}>
      <div className={topbarStyles.notify}>
        <img src={notification} alt="" className="" />
      </div>
      <div className={topbarStyles.searchBox}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="search members, resources, trends, contributors"
        />
        <button type="submit">
          <img src={search} alt="" className="" />
        </button>
      </div>
      <div className={topbarStyles.profileInfo}>
        <div className={topbarStyles.profileImg}>
          <img src={avatar} alt="" className="" />
        </div>
        <div className={topbarStyles.profileDetails}>
          <p className={topbarStyles.profileName}>Oluwaseun</p>
          <p className={topbarStyles.profileBadge}>STUDENT</p>
        </div>
      </div>
    </div>
  );
}
