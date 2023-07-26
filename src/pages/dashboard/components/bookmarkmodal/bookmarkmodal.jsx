/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useContext } from 'react';

import bookModalStyles from './bookmarkmodal.module.css';

import { CloseCircle } from 'iconsax-react';

import { useCreateBookmarkMutation } from '../../../../app/slices/apiSlices/bookmarkSlice';

import { ToasterContext } from '../../../../components/Toaster';

export default function BookmarkModal({
  handleToggleBookmarkModal,
  postId,
  postType,
  postTitle,
}) {
  const [title, setTitle] = useState(postTitle ? postTitle : '');

  const {setToast} = useContext(ToasterContext)

  const [createBookmark, { data, isLoading, isSuccess, isError, error }] =
    useCreateBookmarkMutation();

  const handleCreateBookmark = () => {
    createBookmark({ title, postId, postType });
  };
  
  useEffect(() => {
    if (isSuccess) {
      setToast({
        show : true,
        type : 'success',
        message : data.message
      })
      setTimeout(() => handleToggleBookmarkModal(), 1000);
      setTimeout(() => setToast({show : false}), 3000);
    } else if (isError) {
      setToast({
        show : true,
        type : 'error',
        message : error.data.message
      })
      setTimeout(() => setToast({show : false}), 3000);
    }
  }, [isSuccess, isError]);

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
