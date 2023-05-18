import React from "react";
import errorStyle from "./error.module.css";
import ErrorImg from "../../assets/general/page-not-found.png";
import { useRouteError } from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  return (
    <div className={errorStyle.errorContainer}>
      <div className={errorStyle.error}>
        <div className={errorStyle.errorImg}>
          <img src={ErrorImg} alt="error" />
          {/* <p>Error {error.status}</p> */}
        </div>
        <div className={errorStyle.errorText}>
          <p>Page not found.</p>
          Click{" "}
          <a
            className={errorStyle.errorLink}
            href="https://github.com/AltCamp/altcampv1-frontend/issues/new/choose"
          >
            here{" "}
          </a>
          to report any issue.
        </div>
      </div>
    </div>
  );
}
