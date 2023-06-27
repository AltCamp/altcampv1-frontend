import React from 'react'
import style from "./Toaster.module.css";
import {FaExclamationTriangle,FaCheckCircle,FaInfoCircle } from 'react-icons/fa'
import {BsFillExclamationCircleFill} from 'react-icons/bs'
import {GrFormClose} from 'react-icons/gr'


function Toaster({type, message, show, onClick }) {
    const icon = {
        error : <BsFillExclamationCircleFill/>,
        info : <FaInfoCircle/>,
        warning : <FaExclamationTriangle/>,
        success : <FaCheckCircle/>,
    }
    return (
        <>
         {show && <div className={`${style.toast} ${style[type]}`} >
            <div className={style.toastIcon}>
            {icon[type]}
            </div>
            <div className={style.toastCnt}>
                <h6 className={style.toastTitle}>{type}</h6>
                <p>{message}</p>
            </div>
            <div>
                <div onClick={onClick} className={style.toastBtn} type='button'><GrFormClose/></div>
            </div>
        </div>
        }
    </>
)
}

export default Toaster