import React, {useState} from "react";
import BookmarkCard from "./bookmarkCard/bookmarkCard";
import bookmarksStyles from "./bookmarks.module.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { useGetAllBookmarksQuery } from "../../../../app/slices/apiSlices/bookmarkSlice";

export default function Bookmarks() {
  const [isActionOpen, setActionOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { data, isLoading, error, isSuccess } = useGetAllBookmarksQuery();

  const bookmarks = data?.data;

  console.log("Bookmarks", bookmarks);

  const handleToggleAction = () => {
    setActionOpen(!isActionOpen);
  };

  const handleToggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  return (
    <div className={bookmarksStyles.bookmarkContainer}>
      <div className={bookmarksStyles.bookmarkContent}>
        <h2>Bookmarks</h2>
        
        {/* NavBar */}
        <div className={bookmarksStyles.bookmarkNav}>
      <div className={bookmarksStyles.select}>
        <button
          className={bookmarksStyles.bookButton}
          onClick={handleToggleAction}
        >
          <span> Action</span>{" "}
          <RiArrowDownSLine
            className={bookmarksStyles.bookIcon}
            size="20"
            color="#fff"
          />
        </button>
        {isActionOpen && (
          <div className={bookmarksStyles.btnMenu}>
            <a href="#">
              Remove Bookmark
            </a>
            <a className={bookmarksStyles.lastMenu} href="#">
              Forward
            </a>
          </div>
        )}
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
          <button
            className={bookmarksStyles.bookButton}
            onClick={handleToggleFilter}
          >
            <span>Filter</span>{" "}
            <RiArrowDownSLine
              className={bookmarksStyles.bookIcon}
              size="20"
              color="#fff"
            />
          </button>
          {isFilterOpen && (
            <div className={bookmarksStyles.btnMenu}>
              <a href="#">All Bookmarks</a>
              <a href="#">Recent Bookmarks</a>
              <a href="#">Older Bookmarks</a>
              <a href="#">Highest Comments</a>
              <a className={bookmarksStyles.lastMenu} href="#">
                Highest Likes
              </a>
            </div>
          )}
        </div>
        <button className={bookmarksStyles.allButton}>All</button>
      </div>
    </div>


        {/* Card */}
        <div className={bookmarksStyles.bookmarkMain}>
          {isSuccess &&
            bookmarks?.map((bookmark) => (
              <BookmarkCard
                bookmark={bookmark}
                index={bookmark._id}
                key={bookmark._id}
              />
            ))}
        </div>
        {/* Pagination */}
        <div className={bookmarksStyles.pagination}>
          <button className={bookmarksStyles.previousBtn}>Previous</button>
          <button className={bookmarksStyles[("pageBtn", "btnActive")]}>
            1
          </button>
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