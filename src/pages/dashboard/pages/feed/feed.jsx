import React from "react";
import feedStyle from "./feed.module.css";
export default function Feed() {

  return (
    <div className={feedStyle.feedContainer}>
    
        <div className={feedStyle.feed}>
          <div className={feedStyle.feedHeader}>
            <h2>Feed</h2>
          </div>
        </div>
  
    </div>
  );
}
