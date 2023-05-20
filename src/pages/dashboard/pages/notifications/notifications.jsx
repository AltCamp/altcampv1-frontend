import React, { useState } from "react";
import notificationsStyles from "./notifications.module.css";
import ReactPaginate from "react-paginate";
import EmptyNotification from "../../../../assets/general/EmptyNotification.png";
import { Link } from "react-router-dom";
import FilterModal from "./modals/filterModal";
import SortModal from "./modals/sortModal";

export default function Notifications() {
  const [notification, setNotification] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const notificationsPerPage = 6;
  const data = [
    {
      id: 1,
      name: "Seun Akingboye",
      day: "Today",
      time: "4:00pm",
    },
    {
      id: 2,
      name: "Seun Akingboye",
      day: "Yesterday",
      time: "4:00pm",
    },
    {
      id: 3,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 4,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 5,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 6,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 7,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 8,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },

    {
      id: 9,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 10,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 11,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 12,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
    {
      id: 13,
      name: "Seun Akingboye",
      day: "03/02/2022",
      time: "4:00pm",
    },
  ];

  const startIndex = currentPage * notificationsPerPage;
  const endIndex = startIndex + notificationsPerPage;
  const notificationsToDisplay = data.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className={notificationsStyles.container}>
      {/* No Notification */}
      {!notification && (
        <div className={notificationsStyles.emptyNotification}>
          <div className={notificationsStyles.noNotificationHeader}>
            <h3>Notifications</h3>
          </div>
          <div className={notificationsStyles.noNotification}>
            <img src={EmptyNotification} alt="empty notification" />
            <p>
              No notifications here yet -
              <span> your notifications will show here</span>
            </p>
          </div>
        </div>
      )}
      {/* Notifications content */}

      {notification && (
        <div className={notificationsStyles.notifications}>
          <div className={notificationsStyles.notificationHeader}>
            <h3>Notifications</h3>

            {/* modal icons */}

            <div className={notificationsStyles.modalSection}>
              <SortModal />
              <div className={notificationsStyles.verticalLine}></div>
              <FilterModal />
            </div>
          </div>
          <div className={notificationsStyles.main}>
            {notificationsToDisplay.map((item) => (
              <div>
                <div className={notificationsStyles.notification} key={item.id}>
                  <div className={notificationsStyles.message}>
                    <h2>
                      <span>{item.name}</span> has dropped an answer to your
                      question
                    </h2>
                    <p className={notificationsStyles.time}>
                      {item.day} at {item.time}
                    </p>
                  </div>
                  <div className={notificationsStyles.details}>
                    <Link to="/dashboard/community">View Details</Link>
                  </div>
                </div>

                <div className={notificationsStyles.horizontalLine}></div>
              </div>
            ))}
          </div>

          <div className={notificationsStyles.pagination}>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageRangeDisplayed={3}
              pageCount={Math.ceil(data.length / notificationsPerPage)}
              onPageChange={handlePageChange}
              containerClassName={notificationsStyles.paginate}
              activeClassName={notificationsStyles.active}
              pageLinkClassName={notificationsStyles.pageLink}
              nextLinkClassName={notificationsStyles.pageLink}
              previousLinkClassName={notificationsStyles.pageLink}
            />
            {/* <button className={notificationsStyles.prev}>Previous</button>
            <button className={notificationsStyles[("pageLink", "active")]}>
              1
            </button>
            <button className={notificationsStyles.pageLink}>2</button>
            <button className={notificationsStyles.pageLink}>3</button>

            <button className={notificationsStyles.next}>Next</button> */}
             <div className={notificationsStyles.pageCount}>
              <span>1</span>/<span>60</span>
            </div> 
          </div>
        </div>
      )}
    </div>
  );
}
