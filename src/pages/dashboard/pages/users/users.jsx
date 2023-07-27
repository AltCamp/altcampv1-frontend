// import Empty from '../../empty/empty'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import userStyles from './users.module.css';
import searchicon from '../../../../assets/icons/searchicon.png';
import { useGetAllAccountsQuery } from '../../../../app/slices/apiSlices/accountSlice';

import { ProfileCircle } from 'iconsax-react';
import { Link } from 'react-router-dom';

export default function Users() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountType, setAccountType] = useState('');

  const { data, isLoading, isSuccess, isError, error } = useGetAllAccountsQuery(
    { accountType, searchTerm, page }
  );

  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.innerText === 'All') {
      setAccountType('');
    } else {
      setAccountType(e.target.innerText);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    // if(e.target.value === ""){
    //   setAccountType("");
    // }
  };

  // const { data: searchData, isLoading: searchLoading, isSuccess: searchSuccess, isError: searchError, error: searchErr } = useGetSearchedAccountsQuery(searchTerm)

  // console.log(searchData)

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
          search and view other members of this platform
        </p>
        <div className={userStyles.line}></div>
        <aside className={userStyles.filter}>
          <div className={userStyles.search}>
            <input
              type="text"
              placeholder="search users"
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
            />
            <span className={userStyles.searchicon}>
              <img src={searchicon} alt="" />
            </span>
          </div>
          <div className={userStyles.filterList}>
            <ul className={userStyles.filterItems}>
              <li
                className={userStyles.filterItem}
                style={{
                  backgroundColor:
                    accountType === '' ? 'var(--primary-clr-black)' : '',
                  color: accountType === '' ? '#fff' : '',
                  border:
                    accountType === ''
                      ? '1px solid var(--primary-clr-black)'
                      : '',
                }}
                onClick={(e) => handleFilter(e)}
              >
                All
              </li>
              <li
                className={userStyles.filterItem}
                style={{
                  backgroundColor:
                    accountType === 'Student' ? 'var(--primary-clr-black)' : '',
                  color: accountType === 'Student' ? '#fff' : '',
                  border:
                    accountType === 'Student'
                      ? '1px solid var(--primary-clr-black)'
                      : '',
                }}
                onClick={(e) => handleFilter(e)}
              >
                Student
              </li>
              <li
                className={userStyles.filterItem}
                style={{
                  backgroundColor:
                    accountType === 'Mentor' ? 'var(--primary-clr-black)' : '',
                  color: accountType === 'Mentor' ? '#fff' : '',
                  border:
                    accountType === 'Mentor'
                      ? '1px solid var(--primary-clr-black)'
                      : '',
                }}
                onClick={(e) => handleFilter(e)}
              >
                Mentor
              </li>
            </ul>
          </div>
        </aside>
        {/* <aside className={userStyles.filternav}>
          <ul className={userStyles.filternavItems}>
            <li className={userStyles.filternavItem}>week</li>
            <li className={userStyles.filternavItem}>month</li>
            <li className={userStyles.filternavItem}>quater</li>
            <li className={userStyles.filternavItem}>year</li>
            <li className={userStyles.filternavItem}>all</li>
          </ul>
        </aside> */}
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
              onClick={() => setPage((prev) => prev - 1)}
              disabled={meta?.currentPage <= 1}
            >
              Previous
            </button>
            {[...Array(meta?.totalPages)].map((i, index) => {
              return (
                <button
                  className={userStyles.pageBtn}
                  key={index}
                  style={{
                    backgroundColor:
                      meta?.currentPage === index + 1
                        ? 'var(--secondary-clr-lter-blue)'
                        : '',
                    color: meta?.currentPage === index + 1 ? '#FFFFFF' : '',
                  }}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button
              className={userStyles.nextBtn}
              onClick={() => setPage((prev) => prev + 1)}
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
                  if (e.key === 'Enter') {
                    setPage(pages);
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
