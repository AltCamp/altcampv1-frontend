import React, { useState } from 'react';

import Postcard from '../feed/postcard';
import Questioncard from '../community/questioncard';
import Answercard from '../community/questionpage/answercard';
import Postcomment from '../feed/postpage/postcomment';

const bookmarkcard = ({ bookmark }) => {
  return (
    <>
      {bookmark.postType == 'Post' ? (
        <Postcard
          key={bookmark._id}
          post={bookmark?.post}
          isBookmarked={true}
        />
      ) : bookmark.postType == 'Question' ? (
        <Questioncard
          key={bookmark._id}
          question={bookmark?.post}
          isBookmarked={true}
        />
      ) : bookmark.postType == 'Answer' ? (
        <Answercard
          key={bookmark._id}
          answer={bookmark?.post}
          isBookmarked={true}
        />
      ) : bookmark.postType == 'Comment' ? (
        <Postcomment
          key={bookmark._id}
          comment={bookmark?.post}
          isBookmarked={true}
        />
      ) : null}
    </>
  );
};

export default bookmarkcard;
