// import Empty from '../../empty/empty'
import React, { useState, useEffect } from 'react'
import userStyles from './users.module.css'
import searchicon from '../../../../assets/icons/searchicon.png'
import { useGetAllAccountsQuery } from '../../../../app/slices/apiSlices/accountSlices/accountMutationSlice'
import { ProfileCircle } from 'iconsax-react'
import { Link } from 'react-router-dom'

export default function Users () {
  const [display, setDisplay] = useState('')
  const [totalpage, setTotalPage] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllAccountsQuery()

  useEffect(() => {
    if (isSuccess) {
      const userData = data?.data
      const totalPage = Math.ceil(userData.length / 16)
      const user_per_page = 16
      const start = (pageNo - 1) * user_per_page
      const end = start + user_per_page
      const info = userData.slice(start, end)
      setTotalPage(totalPage)
      setDisplay(info)
    }
  }, [isSuccess, pageNo])

  const btn = []
  for (let i = 1; i < totalpage + 1; i++) {
    btn.push(i)
  }

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
            <input type='text' placeholder='search users' />
            <span className={userStyles.searchicon}>
              <img src={searchicon} alt='' />
            </span>
          </div>
          <div className={userStyles.filterList}>
            <ul className={userStyles.filterItems}>
              <li className={userStyles.filterItem}>Name</li>
              <li className={userStyles.filterItem}>School</li>
              <li className={userStyles.filterItem}>Location</li>
              <li className={userStyles.filterItem}>New users</li>
              <li className={userStyles.filterItem}>Moderations</li>
            </ul>
          </div>
        </aside>
        <aside className={userStyles.filternav}>
          <ul className={userStyles.filternavItems}>
            <li className={userStyles.filternavItem}>week</li>
            <li className={userStyles.filternavItem}>month</li>
            <li className={userStyles.filternavItem}>quater</li>
            <li className={userStyles.filternavItem}>year</li>
            <li className={userStyles.filternavItem}>all</li>
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
            display &&
            display.map((user, index) => {
              return (
                <div className={userStyles.user} key={index}>
                  <div className={userStyles.userImg}>
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt='' />
                    ) : (
                      <ProfileCircle size={45} color='#555555' />
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
                    <p className={userStyles.userLocation}>Lagos, Nigeria</p>
                    <p className={userStyles.track}>{user.track}</p>
                  </div>
                </div>
              )
            })}
        </aside>
      </section>
      {/* pagination */}

      <section className={userStyles.bottom}>
        {isSuccess && (
          <div className={userStyles.pagination}>
            <button
              className={userStyles.previousBtn}
              // onClick={setPageNo((prev) => prev - 1)}
              disabled={pageNo <= 1}
            >
              Previous
            </button>
            {totalpage > 0 &&
              btn.map((item, index) => {
                return (
                  <button
                    className={userStyles.pageBtn}
                    key={index}
                    onClick={() => setPageNo(item)}
                  >
                    {item}
                  </button>
                )
              })}
            <button
              className={userStyles.nextBtn}
              // onClick={setPageNo((prev) => prev + 1)}
              disabled={pageNo >= totalpage}
            >
              Next
            </button>
            <div className={userStyles.pageCount}>
              <span className={userStyles.currentPage}>1</span>
              <span className={userStyles.divider}>/</span>
              <span className={userStyles.totalPage}>60</span>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
