// import Empty from '../../empty/empty'
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import userStyles from "./users.module.css";
import searchicon from "../../../../assets/icons/searchicon.png";
import { useGetAllAccountsQuery } from "../../../../app/slices/apiSlices/accountSlices/accountMutationSlice";
import { useGetAccountsByCategoryQuery } from "../../../../app/slices/apiSlices/accountSlices/accountMutationSlice";
import { ProfileCircle } from "iconsax-react";
import { Link } from "react-router-dom";

export default function Users() {
  const [pageNo, setPageNo] = useState(1);

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllAccountsQuery(pageNo);

  const { meta, data: users } = data || [];

  const [pages, setPages] = useState(meta?.currentPage || 1);

  useEffect(() => {
    setPages(meta?.currentPage);
  }, [meta?.currentPage]);

  return (
    <main className={userStyles.container}>
      <section className={userStyles.top}>
        <h2 className={userStyles.head}>Users</h2>
        <p className={userStyles.desc}>
          Search and view other members of this platform
        </p>
        <div className={userStyles.line}></div>
        <aside className={userStyles.filter}>
          <div className={userStyles.search}>
            <input type="text" placeholder="search users" />
            <span className={userStyles.searchicon}>
              <img src={searchicon} alt="" />
            </span>
          </div>
          <div className={userStyles.filterList}>
            <ul className={userStyles.filterItems}>
              <li className={userStyles.filterItem}>All</li>
              <li
                className={userStyles.filterItem}
                onClick={(e) => handleFilter(e)}
              >
                Student
              </li>
              <li className={userStyles.filterItem}>Mentor</li>
            </ul>
          </div>
        </aside>
        <aside className={userStyles.filternav}>
          <ul className={userStyles.filternavItems}>
            <li className={userStyles.filternavItem}>Week</li>
            <li className={userStyles.filternavItem}>Month</li>
            <li className={userStyles.filternavItem}>Quater</li>
            <li className={userStyles.filternavItem}>Year</li>
            <li className={userStyles.filternavItem}>All</li>
          </ul>
        </aside>
      </section>
      {/* list of users */}
      <section className={userStyles.middle}>
        {isLoading && (
          <div className={userStyles.loading}>
            <div className={userStyles.loader}></div>
          </div>
        )}
        <aside className={userStyles.body}>
          {isSuccess &&
            users.map((user, index) => {
              return (
                <div className={userStyles.user} key={index}>
                  <div className={userStyles.userImg}>
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="" />
                    ) : (
                      <ProfileCircle size={45} color="#555555" />
                    )}
                  </div>
                  <div className={userStyles.userDetails}>
                    <Link
                      className={userStyles.profileLink}
                      to={`/dashboard/users/${user._id}`}
                    >
                      <p className={userStyles.userName}>
                        {user.firstName} {user.lastName}
                      </p>
                    </Link>
                    <p className={userStyles.userLocation}>
                      {user.accountType}
                    </p>
                    <p className={userStyles.track}>{user.track}</p>
                  </div>
                </div>
              );
            })}
        </aside>
      </section>
      {/* pagination */}

      <section className={userStyles.bottom}>
        {isSuccess && (
          <div className={userStyles.pagination}>
            <button
              className={userStyles.previousBtn}
              onClick={() => setPageNo((prev) => prev - 1)}
              disabled={meta?.currentPage <= 1}
            >
              Prev
            </button>
            {[...Array(meta?.totalPages)].map((i, index) => {
              return (
                <button
                  className={userStyles.pageBtn}
                  key={index}
                  style={{
                    backgroundColor:
                      meta?.currentPage === index + 1
                        ? "var(--secondary-clr-lter-blue)"
                        : "",
                    color: meta?.currentPage === index + 1 ? "#FFFFFF" : "",
                  }}
                  onClick={() => setPageNo(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              className={userStyles.nextBtn}
              onClick={() => setPageNo((prev) => prev + 1)}
              disabled={meta?.currentPage === meta?.totalPages}
            >
              Next
            </button>
            <div className={userStyles.pageCount}>
              <input
                type="number"
                className={userStyles.currentPage}
                value={pages}
                onChange={(e) => {
                  setPages(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setPageNo(pages);
                  }
                }}
              />
              <span className={userStyles.divider}>/</span>
              <span className={userStyles.totalPage}>{meta?.totalPages}</span>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
