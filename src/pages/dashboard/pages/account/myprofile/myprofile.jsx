import React, {useState} from "react";
import accountStyles from "../account.module.css";
import profileimage from "../../../../../assets/general/profileimage.png";
import { GalleryEdit, Edit, Link21 } from "iconsax-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Myprofile({edit, picUpdate, updateBio}) {
  const [img, setimg] = useState(profileimage);
  const nav = useNavigate()

 
//   console.log(handleEdit)
  const {user } = useSelector(state => state?.user.user)
  return (
    <>
      <article>
      <div className={accountStyles["profileTop"]}>
            <h1 className={accountStyles["profileTop_title"]}>
                Profile 
                </h1>
            <button className={accountStyles["profileTop_link"]}>
                <span><Link21 size={20}/></span> Copy Profile Link
            </button>
            </div>
        <div className={accountStyles["mainPanelTop"]}>
            
          <div className={accountStyles["mainPanelTop_profileImage"]}>
            <img src={img} alt=""/>
            <span>
              <GalleryEdit
                size={25}
                className={accountStyles["profileImage_icon"]}
                onClick={picUpdate}
              />
            </span>
          </div>
          <div className={accountStyles["mainPanelTop_bio"]}>
            <h1>
              Bio{" "}
              <span onClick={updateBio}>
                <Edit size={20} />
              </span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quo
              tempora provident architecto explicabo sint voluptatibus quae eum
              corrupti unde necessitatibus
            </p>
          </div>
        </div>
        <div className={accountStyles["mainPanelBottom"]}>
          <section className={accountStyles["mainPanelBottom_profileDetails"]}>
            <div className={accountStyles["profileDetails_fName"]}>
              <span>First Name</span>
              <span>{user?.firstName}</span>
            </div>
            <div className={accountStyles["profileDetails_lName"]}>
              <span>Last Name</span>
              <span>{user?.lastName}</span>
            </div>
            {user?.owner?.matric && (
              <div className={accountStyles["profileDetails_sNum"]}>
                <span>Student Number</span>
                <span>{user?.owner.matric}</span>
              </div>
            )}
            <div className={accountStyles["profileDetails_rank"]}>
              <span>Rank</span>
              <span>{user?.accountType}</span>
            </div>
            {user?.learning && (
              <div className={accountStyles["profileDetails_lCircle"]}>
                <span>Learning Circle</span>
                <span>{lCircle}</span>
              </div>
            )}
            <div className={accountStyles["profileDetails_email"]}>
              <span>Email</span>
              <span>{user?.email}</span>
            </div>
          </section>
          <p className={accountStyles["edit"]} onClick={edit}>
            Edit details
          </p>
        </div>
      </article>
    </>
  );
}
