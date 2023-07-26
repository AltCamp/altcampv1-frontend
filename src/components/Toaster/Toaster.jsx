import React from 'react';
import style from './Toaster.module.css';
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
} from 'react-icons/fa';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';

// eslint-disable-next-line react/prop-types
function Toaster({ type, message, show, handleClose, title }) {
  const icon = {
    error: <BsFillExclamationCircleFill />,
    info: <FaInfoCircle />,
    warning: <FaExclamationTriangle />,
    success: <FaCheckCircle />,
  };
  return (
    <>
      {show && (
        <div className={`${style.toast} ${style[type]}`}>
          <div className={style.toastIcon}>{icon[type]}</div>
          <div className={style.toastCnt}>
            <h6 className={style.toastTitle}>{title ? title : type}</h6>
            <p>{message}</p>
          </div>
          <div>
            <div onClick={handleClose} className={style.toastBtn} type="button">
              <GrFormClose />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Toaster;
