import errorStyle from './error.module.css'
import ErrorImg from '../../assets/general/error-img.png'
import { useRouteError } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

export default function Error () {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div className={errorStyle.errorContainer}>
      <div className={errorStyle.error}>
        <div className={errorStyle.errorImg}>
          <img src={ErrorImg} alt='error' />
          <div className={errorStyle.errorStatus}>
            <p className={errorStyle.errorName}>Error</p>
            <p className={errorStyle.errorCode}>{error.status}</p>
          </div>
        </div>
        <div className={errorStyle.errorText}>
          <p className=''>{error.message}</p>
          <p>
            Click{' '}
            <a
              className={errorStyle.errorLink}
              href='https://github.com/AltCamp/altcampv1-frontend/issues/new/choose'
            >
              here{' '}
            </a>
            to report any issue or go{' '}
            <span onClick={() => navigate(-1)}>back</span>
          </p>
        </div>
      </div>
    </div>
  )
}
