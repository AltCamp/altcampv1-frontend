import React, { useRef } from "react";
import { useState, useEffect } from "react";
import filterIcon from "../../../../../assets/icons/filtering.svg";
import filterStyles from "./filterModal.module.css";

export default function filterModal() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const modal = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      e.stopPropagation();
      if (modal.current && !modal.current.contains(e.target)) {
        setShowFilterModal(false);
      }
    };
    if (showFilterModal) {
      document.addEventListener("click", handler);
    } else {
      document.removeEventListener("click", handler);
    }
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [showFilterModal]);

  const changeFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };
  const data = [
    {
      heading: "Filter by showing",
      option1: "Unread notifications only",
      option2: "Read notifications only",
    },
  ];
  return (
    <div ref={modal} className={filterStyles.modalParent}>
      <img
        src={filterIcon}
        alt="filter"
        onClick={changeFilterModal}
        className={filterStyles.btnFilter}
      />
      {showFilterModal && (
        <div className={filterStyles.filterContent}>
          {data.map((item) => (
            <div key={item.heading}>
              <h4 className={filterStyles.heading}>{item.heading}</h4>
              <div className={filterStyles.options}>
                <div className={filterStyles.horizontalLine}></div>
                <div
                  className={filterStyles.option}
                  onClick={changeFilterModal}
                >
                  {item.option1}
                </div>
                <div className={filterStyles.horizontalLine}></div>
                <div
                  className={filterStyles.option}
                  onClick={changeFilterModal}
                >
                  {item.option2}
                </div>
              </div>
            </div>
          ))}
        </div>
        // <div className={filterStyles.filterContent}>
        //   <h4 className={filterStyles.heading}>Filter by showing</h4>
        //   <div className={filterStyles.options}>
        //     <hr />
        //     <div>Unread notifications only</div>
        //     <hr />
        //     <div>Read notifications only</div>
        //   </div>
        // </div>
      )}
    </div>
  );
}
