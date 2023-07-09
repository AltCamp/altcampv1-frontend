import React from 'react';
import emptyStyle from './empty.module.css';
import EmptyImg from '../../../assets/general/empty.png';

export default function Empty() {
  return (
    <div className={emptyStyle.emptyContainer}>
      <div className={emptyStyle.empty}>
        <div className={emptyStyle.emptyImg}>
          <img src={EmptyImg} alt="empty" />
          <p>coming soon</p>
        </div>
        <div className={emptyStyle.emptyText}>
          <p>Nothing to see here yet, this page is under construction.</p>
          <p>
            Click{' '}
            <a
              className={emptyStyle.emptyLink}
              href="https://github.com/AltCamp/altcampv1-frontend/issues/new/choose"
            >
              here{' '}
            </a>
            to report any issue.
          </p>
        </div>
      </div>
    </div>
  );
}
