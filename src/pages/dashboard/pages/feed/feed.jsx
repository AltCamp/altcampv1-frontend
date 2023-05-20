import React from "react";
import feedStyle from "./feed.module.css";
import Empty from "../../empty/empty";
export default function Feed() {
  return (
    <div className={feedStyle.feedContainer}>
      <Empty />
    </div>
  );
}
