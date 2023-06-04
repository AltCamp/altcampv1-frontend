import React, { useState } from "react";
import bookmarksStyles from "./bookmarks.module.css";
import { HiStar } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { LuEdit } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import { RiShareForwardLine, RiArrowDownSLine } from "react-icons/ri";

export default function Bookmarks() {
  const [unread, setUnread] = useState(true);
  const [isActive, setIsActive] = useState(null);

  const handleActive = (index) => {
    setIsActive(index === isActive ? null : index);
  };

  const data = [
    {
      id: 1,
      topic: "What is Visual Hierarchy?",
      postedBy: "Jessica Joseph .C",
      datePosted: ["02 Jan, 2021", "7:00 PM"],
      comments: 200,
      likes: 1000,
      tags: "UI/UX",
      unreadStatus: true,
    },
    {
      id: 2,
      topic: "Who are the best UI/UX Designers?",
      postedBy: "Jessica Joseph .C",
      datePosted: ["02 Jan, 2021", "7:00 PM"],
      comments: 200,
      likes: 1000,
      tags: "UI/UX",
      unreadStatus: true,
    },
    {
      id: 3,
      topic: "What makes a good design?",
      postedBy: "John Holt",
      datePosted: ["02 Jan, 2021", "7:45 PM"],
      comments: 513,
      likes: 512,
      tags: "Prod Designer",
      unreadStatus: false,
    },
    {
      id: 4,
      topic: "What are the 3 areas of product management?",
      postedBy: "Dayo Ademola",
      datePosted: ["03 Jan, 2021", "8:00 AM"],
      comments: 313,
      likes: 600,
      tags: "Prod Management",
      unreadStatus: false,
    },
    {
      id: 5,
      topic: "What is Java Script?",
      postedBy: "Grace Isong",
      datePosted: ["03 Jan, 2021", "8:20 AM"],
      comments: 140,
      likes: 5600,
      tags: "Software Development",
      unreadStatus: true,
    },
    {
      id: 6,
      topic: "What is Scale?",
      postedBy: "Uche Okoro",
      datePosted: ["03 Jan, 2021", "8:20 AM"],
      comments: 616,
      likes: 7000,
      tags: "Prod Design",
      unreadStatus: true,
    },
    {
      id: 7,
      topic: "What is Rhythm?",
      postedBy: "Musa Hamed .H",
      datePosted: ["01 Feb, 2021", "12:00 PM"],
      comments: 200,
      likes: 3500,
      tags: "UI/UX",
      unreadStatus: false,
    },
    {
      id: 8,
      topic: "What is a Product",
      postedBy: "Caroline James",
      datePosted: ["01 Feb, 2021", "12:00 PM"],
      comments: 513,
      likes: 600,
      tags: "Prod Management",
      unreadStatus: true,
    },
    {
      id: 9,
      topic: "Define Design Thinking",
      postedBy: "Eno Mac .H",
      datePosted: ["10 Feb, 2021", "5:15 PM"],
      comments: 140,
      likes: 600,
      tags: "Prod Design",
      unreadStatus: false,
    },
    {
      id: 10,
      topic: "Difference between Automation and ",
      postedBy: "Ben Williams",
      datePosted: ["10 Feb, 2021", "5:15 PM"],
      comments: 200,
      likes: 200,
      tags: "UI/UX",
      unreadStatus: false,
    },
    {
      id: 11,
      topic: "List of Figma Shortcuts",
      postedBy: "Ayomide James .A",
      datePosted: ["05 Nov, 2022", "10:30 AM"],
      comments: 140,
      likes: 3700,
      tags: "Prod Design",
      unreadStatus: true,
    },
    {
      id: 12,
      topic: "I need Mockup resources",
      postedBy: "Emmanuel King .J",
      datePosted: ["06 Nov, 2022", "11:59 AM"],
      comments: 213,
      likes: 150,
      tags: "Software Development",
      unreadStatus: true,
    },
    {
      id: 13,
      topic: "Different space guides",
      postedBy: "Blessing Richard",
      datePosted: ["10 Feb, 2023", "10:10 PM"],
      comments: 200,
      likes: 250,
      tags: "UI/UX",
      unreadStatus: false,
    },
  ];

  return (
    <div className={bookmarksStyles.bookmarkContainer}>
      <h2>Bookmarks</h2>

      {/* NavBar */}
      <div className={bookmarksStyles.bookmarkNav}>
        <div className={bookmarksStyles.select}>
          <button className={bookmarksStyles.bookButton}>
            Actions <RiArrowDownSLine size="20" color="#fff" />
          </button>
          <div className={bookmarksStyles.btnMenu}>
            <a href="#">Remove Bookmark</a>
            <a href="#">Mark as Unread</a>
            <a href="#">Forward</a>
            <a className={bookmarksStyles.lastMenu} href="#">
              Expand
            </a>
          </div>
        </div>
        <div className={bookmarksStyles.search}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search bookmarks ..."
          />
        </div>
        <div className={bookmarksStyles.filter}>
          <div className={bookmarksStyles.select}>
            <button className={bookmarksStyles.bookButton}>
              Filter <RiArrowDownSLine size="20" color="#fff" />
            </button>
            <div className={bookmarksStyles.btnMenu}>
              <a href="#">All Bookmarks</a>
              <a href="#">Recent Bookmarks</a>
              <a href="#">Older Bookmarks</a>
              <a href="#">Highest Comments</a>
              <a className={bookmarksStyles.lastMenu} href="#">
                Highest Likes
              </a>
            </div>
          </div>
          <button className={bookmarksStyles.allButton}>All</button>
        </div>
        <button className={bookmarksStyles.settings}>Settings</button>
      </div>

      {/* Table */}
      <div className={bookmarksStyles.bookmarkMain}>
        <table>
          <thead>
            <tr className={bookmarksStyles.bookmarkHeader}>
              <th className={bookmarksStyles.checkbox}></th>
              <th className={bookmarksStyles.topic}>Topic</th>
              <th className={bookmarksStyles.postedBy}>Posted By</th>
              <th className={bookmarksStyles.datePosted}>Date Posted</th>
              <th className={bookmarksStyles.comments}>Comments</th>
              <th className={bookmarksStyles.likes}>Likes</th>
              <th className={bookmarksStyles.tags}>Tags</th>
              <th className={bookmarksStyles.status}>Unread Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => {
              return (
                <div
                  className={`${bookmarksStyles.tableData} ${bookmarksStyles.active}`}
                  key={item.id}
                >
                  <tr
                    className={isActive === index ? bookmarksStyles.active : ""}
                  >
                    <td className={bookmarksStyles.checkbox}>
                      <input type="checkbox" />
                    </td>
                    <div
                      onClick={() => handleActive(index)}
                      className={bookmarksStyles.tableContent}
                    >
                      <td className={bookmarksStyles.topic}> {item.topic} </td>
                      <td className={bookmarksStyles.postedBy}>
                        {" "}
                        {item.postedBy}{" "}
                      </td>
                      <td className={bookmarksStyles.datePosted}>
                        {" "}
                        {item.datePosted[0]}{" "}
                        <span className={bookmarksStyles.timePosted}>
                          {item.datePosted[1]}
                        </span>
                      </td>
                      <td className={bookmarksStyles.comments}>
                        {" "}
                        {item.comments}{" "}
                      </td>
                      <td className={bookmarksStyles.likes}> {item.likes} </td>
                      <td className={bookmarksStyles.tags}> {item.tags} </td>
                      <td>
                        <span className={bookmarksStyles.statSpan}>
                          {item.unreadStatus && unread ? (
                            <HiStar
                              className={bookmarksStyles.statusHr}
                              size="25"
                              color="#FFA113"
                            />
                          ) : (
                            <HiStar
                              className={bookmarksStyles.statusHr}
                              size="25"
                              color="#EEF0F2"
                            />
                          )}
                        </span>
                      </td>
                    </div>
                  </tr>

                  {/* Accordion */}
                  {isActive === index && (
                    <div className={bookmarksStyles.tableBody}>
                      <div
                        className={bookmarksStyles.bodyHeader}
                        onClick={() => handleActive(index)}
                      >
                        <div className={bookmarksStyles.bodyHeaderLeft}>
                          <h3>{item.topic}</h3>
                        </div>
                        <div className={bookmarksStyles.posted}>
                          <p>
                            <span className={bookmarksStyles.poster}>
                              {item.postedBy}
                            </span>{" "}
                            <span className={bookmarksStyles.dated}>
                              {item.datePosted[0]} {item.datePosted[1]}
                            </span>
                          </p>
                        </div>
                        <div className={bookmarksStyles.bottomIcons}>
                          <div className={bookmarksStyles.buttonContainer}>
                            <div className={bookmarksStyles.bodyButton}>
                              <LuEdit
                                className={bookmarksStyles.bodyIcons}
                                size="16"
                              />{" "}
                              Reply
                            </div>
                            <div className={bookmarksStyles.bodyButton}>
                              <BiComment
                                className={bookmarksStyles.bodyIcons}
                                size="16"
                              />
                              <span>
                                {" "}
                                Comments{" "}
                                <span className={bookmarksStyles.numbers}>
                                  {item.comments}
                                </span>
                              </span>
                            </div>
                            <div className={bookmarksStyles.bodyButton}>
                              <AiOutlineLike
                                className={bookmarksStyles.bodyIcons}
                                size="16"
                              />

                              <span>
                                Likes{" "}
                                <span className={bookmarksStyles.numbers}>
                                  {" "}
                                  {item.likes}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div className={bookmarksStyles.shareContainer}>
                            <span>
                              {item.unreadStatus && unread ? (
                                <HiStar size="25" color="#FFA113" />
                              ) : (
                                <HiStar size="25" color="#EEF0F2" />
                              )}
                            </span>
                            <span>
                              <div className={bookmarksStyles.bodyButton}>
                                {" "}
                                <RiShareForwardLine
                                  className={bookmarksStyles.bodyIcons}
                                  size="25"
                                />{" "}
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </tbody>
        </table>
              {/* Pagination */}
      <div className={bookmarksStyles.pagination}>
        <button className={bookmarksStyles.previousBtn}>Previous</button>
        <button className={bookmarksStyles[("pageBtn", "btnActive")]}>1</button>
        <button className={bookmarksStyles.pageBtn}>2</button>
        <button className={bookmarksStyles.pageBtn}>3</button>
        <button className={bookmarksStyles.nextBtn}>Next</button>
        <div className={bookmarksStyles.pageCount}>
          <span className={bookmarksStyles.currentPage}>1</span>
          <span className={bookmarksStyles.divider}>/</span>
          <span className={bookmarksStyles.totalPage}>60</span>
        </div>
      </div>
      </div>


    </div>
  );
}
