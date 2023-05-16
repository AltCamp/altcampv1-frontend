import React, { useState } from "react";
import feedStyle from "./feed.module.css";
import ErrorFeed from "../../../../assets/general/error-img.png";
import { Link } from "react-router-dom";
export default function Feed() {
  const [feedError, setFeedError] = useState(true);

  return (
    <div className={feedStyle.feedContainer}>
      {feedError ? (
        <div className={feedStyle.feedErrorContainer}>
          <div className={feedStyle.feedError}>
            <div className={feedStyle.feedErrorImg}>
              <img src={ErrorFeed} alt="error" />
              <p>error 404</p>
            </div>
            <div className={feedStyle.feedErrorText}>
              <p>Nothing to see here yet, this page is under construction.</p>
              Click{" "}
              <Link className={feedStyle.errorLink} to="https://github.com/AltCamp/altcampv1-frontend/issues">
                here{" "}
              </Link>
              to report any issue.
            </div>
          </div>
        </div>
      ) : (
        <div className={feedStyle.feed}>
          <div className={feedStyle.feedHeader}>
            <h2>Feed</h2>
          </div>
        </div>
      )}
    </div>
  );
}
