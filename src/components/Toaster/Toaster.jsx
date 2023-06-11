import React from 'react'
import style from "./Toaster.module.css";
import { ErrorIcon, InfoIcon, WarningIcon, SuccessIcon } from '../../assets/toast'

function Toaster({type, message, show }) {
    const icon = {
        error : <ErrorIcon/>,
        info : <InfoIcon/>,
        warning : <WarningIcon/>,
        success : <SuccessIcon/>,
    }
    return (
        <>
         {show && <div className={(style.toast, style[type])} >
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
