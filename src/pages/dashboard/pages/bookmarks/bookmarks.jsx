import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BookmarkCard from "./bookmarkCard/bookmarkCard";
import bookmarksStyles from "./bookmarks.module.css";
import { RiArrowDownSLine } from "react-icons/ri";
import { useGetAllBookmarksQuery } from "../../../../app/slices/apiSlices/bookmarkSlice";
import EmptyBookmark from "../../../../assets/general/EmptyNotification.png";

export default function Bookmarks() {
  const [isActionOpen, setActionOpen] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [sortedBookmarks, setSortedBookmarks] = useState([]);
  const [emptyBookmark, setEmptyBookmark] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error, isSuccess } = useGetAllBookmarksQuery({
    page: searchParams.get("page") ? searchParams.get("page") : 1,
  });
  const bookmarks = data?.data;

  const handleToggleAction = () => {
    setActionOpen(!isActionOpen);
  };

  const handleToggleFilter = () => {
    setFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    if (bookmarks) {
      const copyBookmarks = [...bookmarks];
      const theBookmarks = copyBookmarks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setSortedBookmarks(theBookmarks);
    }
  }, [bookmarks]);

  useEffect(() => {
    if (sortedBookmarks.length === 0) {
      setEmptyBookmark(true);
    } else {
      setEmptyBookmark(false);
    }
  }, [sortedBookmarks]);

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0);
    }
  }, [searchParams.get("page"), data]);

  const navigate = useNavigate();

  return (
    <div className={bookmarksStyles.bookmarkContainer}>
      {isLoading && (
        <div className={bookmarksStyles.loading}>
          <div className={bookmarksStyles.loader}></div>
        </div>
      )}
      {isSuccess && bookmarks.length > 0 && (
        <div className={bookmarksStyles.bookmarkContent}>
          <h2>Bookmarks</h2>

          {/* NavBar */}
          <div className={bookmarksStyles.bookmarkNav}>
            <div className={bookmarksStyles.select}>
              <button
                className={bookmarksStyles.bookButton}
                onClick={handleToggleAction}
              >
                <span>Action</span>{" "}
                <RiArrowDownSLine
                  className={bookmarksStyles.bookIcon}
                  size="20"
                  color="#fff"
                />
              </button>
              {isActionOpen && (
                <div className={bookmarksStyles.btnMenu}>
                  <a href="#">Remove Bookmark</a>
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
            {sortedBookmarks.map((bookmark) => (
              <BookmarkCard bookmark={bookmark} key={bookmark._id} />
            ))}
          </div>

          {/* Pagination */}

          {sortedBookmarks.length > 0 && (
            <div className={bookmarksStyles.pagination}>
              <button
                className={bookmarksStyles.previousBtn}
                onClick={() => setSearchParams({ page: page - 1 })}
                disabled={page === 1}
              >
                Previous
              </button>
              {[...Array(Math.ceil(data.total / data.limit)).keys()].map(
                (number) => (
                  <button
                    key={number}
                    className={
                      page === number + 1
                        ? bookmarksStyles.active
                        : bookmarksStyles.pageeBtn
                    }
                    onClick={() => {
                      setSearchParams({ page: number + 1 });
                      setPage(number + 1);
                    }}
                  >
                    {number + 1}
                  </button>
                )
              )}
              <button
                className={bookmarksStyles.nextBtn}
                onClick={() => setSearchParams({ page: page + 1 })}
                disabled={page === Math.ceil(data.total / data.limit)}
              >
                Next
              </button>
              <div className={bookmarksStyles.pageCount}>
                <input
                  type="number"
                  className={bookmarksStyles.currentPage}
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchParams({ page: page });
                    }
                  }}
                  onKeyUp={(e) => {
                    if (
                      Number(e.target.value) >
                      Math.ceil(data.total / data.limit)
                    ) {
                      setPage(Math.ceil(data.total / data.limit));
                    }
                  }}
                />
                <span>of {Math.ceil(data.total / data.limit)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {emptyBookmark && !isLoading && (
        <div className={bookmarksStyles.emptyBookmark}>
          <div className={bookmarksStyles.noBookmarkHeader}>
            <h2>Bookmarks</h2>
          </div>
          <div className={bookmarksStyles.noBookmark}>
            <img src={EmptyBookmark} alt="empty bookmark" />
            <p>
              No bookmarks here yet!{" "}
              <span>Bookmark your favorite posts, questions, and answers</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
