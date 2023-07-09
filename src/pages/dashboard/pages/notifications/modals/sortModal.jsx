import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import sortIcon from '../../../../../assets/icons/baseline-sort.svg';
import sortStyles from './sortModal.module.css';

export default function sortModal() {
  const [showSortModal, setShowSortModal] = useState(false);
  const modal = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      e.stopPropagation();
      if (modal.current && !modal.current.contains(e.target)) {
        setShowSortModal(false);
      }
    };
    if (showSortModal) {
      document.addEventListener('click', handler);
    } else {
      document.removeEventListener('click', handler);
    }
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [showSortModal]);

  const changeSortModal = () => {
    setShowSortModal(!showSortModal);
  };
  const data = [
    {
      heading: 'Sort By',
      option1: 'Newest to oldest',
      option2: 'Oldest to newest',
    },
  ];
  return (
    <div ref={modal} className={sortStyles.modalParent}>
      <img
        src={sortIcon}
        alt="sort"
        onClick={changeSortModal}
        className={sortStyles.btnSort}
      />
      {showSortModal && (
        <div className={sortStyles.sortContent}>
          {data.map((item) => (
            <div key={item.heading}>
              <h4 className={sortStyles.heading}>{item.heading}</h4>
              <div className={sortStyles.options}>
                <div className={sortStyles.horizontalLine}></div>
                <div className={sortStyles.option} onClick={changeSortModal}>
                  {item.option1}
                </div>
                <div className={sortStyles.horizontalLine}></div>
                <div className={sortStyles.option} onClick={changeSortModal}>
                  {item.option2}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
