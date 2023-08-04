import { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ProfileCircle } from 'iconsax-react';

import { BsFillBookmarkFill, BsBookmarkPlus } from 'react-icons/bs';

import ReactTimeAgo from 'react-time-ago';

import { useSelector } from 'react-redux';

import { useLikeCommentMutation } from '../../../../../app/slices/apiSlices/feedSlice';

import BookmarkModal from '../../../components/bookmarkmodal/bookmarkmodal';

import VerifyEmailPopUp from '../../../components/verifyEmailPopUp';
export default function Postcomment({ comment }) {
  // const [latestComment, setLatestComment] = useState(comment)

  const [likeAnimation, setLikeAnimation] = useState(false);
  const [toggleBookmarkModal, setToggleBookmarkModal] = useState();

  const { user } = useSelector((state) => state?.user?.user);

  const [queryError, setQueryError] = useState();

  const location = useLocation();

  const navigate = useNavigate();

  const [
    likeComment,
    {
      data: likeCommentData,
      isLoading: likeCommentIsLoading,
      isSuccess: likeCommentIsSuccess,
      isError: likeCommentIsError,
      error: likeCommentError,
    },
  ] = useLikeCommentMutation();

  const handleLikeComment = () => {
    likeComment(comment?._id);
  };

  useEffect(() => {
    if (likeCommentIsSuccess) {
      setLikeAnimation(true);

      setTimeout(() => {
        setLikeAnimation(false);
      }, 1000);
    }
    if (likeCommentIsError) {
      setQueryError(likeCommentError?.data.message);
    }
  }, [likeCommentIsSuccess, likeCommentIsError]);

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal);
  };

  const highlight = `bg-neutral-400 rounded-2 p-2 animate-highlights`;

  // handle scroll to the comment
  useEffect(() => {
    if (location?.state?.postId) {
      const postElement = document.getElementById(location?.state?.postId);
      postElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      postElement?.classList.add(highlight);
      setTimeout(() => {
        postElement?.classList.remove(highlight);
      }, 7000);
    }
    // remove the postId from the location state
    navigate(location?.pathname, { replace: true });
  }, [location?.state?.postId]);

  return (
    <>
      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={comment?._id}
          postType={`Comment`}
          postTitle={comment?.content}
        />
      )}

      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      <div
        className="flex w-full flex-col gap-4 border-b border-b-neutral-400 py-4"
        id={comment?._id}
      >
        <div className="flex items-center gap-2">
          <Link
            to={
              comment?.author?._id === user?._id
                ? `/dashboard/account`
                : `/dashboard/users/${comment?.author._id}`
            }
            className="h-10 w-10 overflow-hidden rounded-full"
          >
            {comment?.author?.profilePicture ? (
              <img
                src={comment?.author?.profilePicture}
                alt=""
                className="h-full w-full object-cover "
              />
            ) : (
              <ProfileCircle
                size={45}
                color="#555555"
                className="h-full w-full object-cover "
              />
            )}
          </Link>
          <div className="flex flex-col ">
            <Link
              to={
                comment?.author?._id === user?._id
                  ? `/dashboard/account`
                  : `/dashboard/users/${comment?.author._id}`
              }
              className="font-semibold text-neutral-900"
            >
              {comment?.author.firstName} {comment?.author.lastName}
            </Link>
            <div className="text-[0.8rem] text-neutral-600">
              {<ReactTimeAgo date={comment?.createdAt} locale="en-US" />}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[0.8rem] overflow-hidden font-medium text-neutral-900 ">
          <div className="">
            <p>{comment?.content}</p>
          </div>
          {/* <div className={postCommentStyles.media}>
                <img src={postMedia} alt='' className='' />
              </div> */}
        </div>

        <div className="flex items-center justify-between ">
          <div className="flex gap-[0.8rem] ">
            <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={
                  comment?.upvotedBy?.includes(user?._id) ? 'red' : '#FFFFFF'
                }
                onClick={handleLikeComment}
                className={`cursor-pointer ${likeAnimation && 'animate-like'} `}
              >
                <path
                  d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                  stroke={
                    comment?.upvotedBy?.includes(user?._id) ? 'red' : '#343A40'
                  }
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div
                className={` ${likeAnimation && 'animate-like'}`}
                style={{
                  color: comment?.upvotedBy?.includes(user?._id)
                    ? 'red'
                    : '#343A40',
                }}
              >
                {comment?.upvotedBy?.length}
              </div>
            </div>
            <div className="w-[1px] bg-neutral-600 "></div>

            <div className="">
              {!comment.isBookmarked ? (
                <BsBookmarkPlus
                  size={20}
                  color="#555555"
                  className="cursor-pointer"
                  onClick={handleToggleBookmarkModal}
                />
              ) : (
                <BsFillBookmarkFill
                  size={20}
                  color="#555555"
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}