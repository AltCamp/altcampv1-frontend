import React from 'react'
import style from "./Toaster.module.css";
import {FaExclamationTriangle, FaCircleCheck,FaInfoCircle } from 'react-icons/fa'
import {GrFormClose} from 'react-icons/gr'


function Toaster({type, message, show }) {
    const icon = {
        error : <BsFillExclamationCircleFill/>,
        info : <FaInfoCircle/>,
        warning : <FaExclamationTriangle/>,
        success : <FaCircleCheck/>,
    }
    return (
        <>
         {show && <div className={`${style.toast} ${style[type]}`} >
            {icon[type]}
            <div>
                <h6 className={style.toastTitle}>{type}</h6>
                <p>{message}</p>
            </div>
        </div>
        }
    </>
)
}

export default Toaster
