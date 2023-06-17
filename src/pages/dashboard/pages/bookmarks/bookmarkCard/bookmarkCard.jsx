import React from "react";
import bookmarkCardStyles from "./bookmarkCardStyles.module.css";
import { AiOutlineLike } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { CiBookmarkRemove } from "react-icons/ci";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
const bookmarkCard = ({ bookmark }) => {
  return (
    <div className={bookmarkCardStyles.tableContent}>
      <div className={bookmarkCardStyles.tableBody}>
        <div className={bookmarkCardStyles.bodyHeader}>
          <div className={bookmarkCardStyles.bodyHeaderLeft}>
            <Link to={`/dashboard/post/${bookmark?._id}`}>
              <h3>{bookmark.title}</h3>
            </Link>
                      <span className={bookmarkCardStyles.tag}>UI/UX</span>

          </div>
          <div className={bookmarkCardStyles.posted}>
            <p>
              <span className={bookmarkCardStyles.poster}>
                {bookmark.owner.firstName} {bookmark.owner.lastName}
              </span>{" "}
              <span className={bookmarkCardStyles.dated}>
                {<ReactTimeAgo date={bookmark.createdAt} locale="en-US" />}
              </span>
            </p>
          </div>
          <div className={bookmarkCardStyles.bottomIcons}>
            <div className={bookmarkCardStyles.buttonContainer}>
              <div className={bookmarkCardStyles.bodyButton}>
                <Link
                  className={bookmarkCardStyles.cardLink}
                  to="/dashboard/community/question"
                >
                  <LuEdit size="16" className={bookmarkCardStyles.bodyIcons} />{" "}
                  Reply
                </Link>
              </div>
              <div className={bookmarkCardStyles.bodyButton}>
                <BiComment size="16" /> Comments{" "}
                <span className={bookmarkCardStyles.numbers}>
                  {bookmark.comments}
                </span>
              </div>
              <div className={bookmarkCardStyles.bodyButton}>
                <span>
                  {" "}
                  <AiOutlineLike size="16" />
                </span>

                <span>
                  {" "}
                  Likes{" "}
                  <span className={bookmarkCardStyles.numbers}>
                    {" "}
                    {bookmark.likes}
                  </span>
                </span>
              </div>
            </div>

            <div className={bookmarkCardStyles.shareContainer}>
              <CiBookmarkRemove
                className={bookmarkCardStyles.bodyIcons}
                size="20"
              />
              <RiShareForwardLine
                className={bookmarkCardStyles.bodyIcons}
                size="20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default bookmarkCard;
