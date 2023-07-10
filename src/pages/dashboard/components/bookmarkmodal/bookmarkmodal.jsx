import { useState, useEffect, useRef } from 'react';

import bookModalStyles from './bookmarkmodal.module.css';

import { CloseCircle } from 'iconsax-react';

import { useCreateBookmarkMutation } from '../../../../app/slices/apiSlices/bookmarkSlice';

export default function BookmarkModal({
  handleToggleBookmarkModal,
  postId,
  postType,
  postTitle,
}) {
  const [title, setTitle] = useState(postTitle ? postTitle : '');

  const [createBookmark, { data, isLoading, isSuccess, isError, error }] =
    useCreateBookmarkMutation();

  const handleCreateBookmark = () => {
    createBookmark({ title, postId, postType });
  };

  useEffect(() => {
    if (isSuccess) {
      handleToggleBookmarkModal();
    }
  }, [isSuccess]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={bookModalStyles.toggleCreateOverlay}>
      <div className={bookModalStyles.toggleCreate}>
        <CloseCircle
          size="20"
          className={bookModalStyles.closeIcon}
          onClick={handleToggleBookmarkModal}
        />
        <div className={bookModalStyles.content}>
          <div className={bookModalStyles.header}>
            <h3 className={bookModalStyles.title}>Create Bookmark</h3>
            <p className={bookModalStyles.p}>{`Create a bookmark for this ${
              postType === 'Post'
                ? 'post'
                : postType === 'Comment'
                ? 'comment'
                : postType === 'Question'
                ? 'question'
                : postType === 'Answer'
                ? 'answer'
                : null
            }`}</p>
          </div>
          <form
            action=""
            className={bookModalStyles.formContainer}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateBookmark();
            }}
          >
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Give your bookmark a title"
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={bookModalStyles.input}
            />

            <button
              type="submit"
              className={bookModalStyles.postBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Adding Bookmark...' : 'Add Bookmark'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
