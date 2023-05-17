import React from "react";
import errorStyle from "./error.module.css";
import ErrorImg from "../../assets/general/error-img.png";
import { Link, useRouteError } from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  return (
    <div className={errorStyle.errorContainer}>
      <div className={errorStyle.error}>
        <div className={errorStyle.errorImg}>
          <img src={ErrorImg} alt="error" />
          <p>{error.message}</p>
        </div>
        <div className={errorStyle.errorText}>
          <p>Nothing to see here yet, this page is under construction.</p>
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
