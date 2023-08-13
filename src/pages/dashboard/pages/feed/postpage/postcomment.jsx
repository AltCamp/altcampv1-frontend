import { useState, useEffect, useRef, forwardRef } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ProfileCircle } from 'iconsax-react';

import { BsBookmarkPlus } from 'react-icons/bs';

import { FcBookmark } from 'react-icons/fc';

import ReactTimeAgo from 'react-time-ago';

import { useSelector } from 'react-redux';

import {
  useLikeCommentMutation,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from '../../../../../app/slices/apiSlices/contentsSlice';

import VerifyEmailPopUp from '../../../components/verifyEmailPopUp';

const Postcomment = forwardRef((props, ref) => {
  Postcomment.displayName = 'Postcomment';
  const { comment, isBookmarked } = props;
  const [latestComment, setLatestComment] = useState(comment);

  const [likeAnimation, setLikeAnimation] = useState(false);

  const [bookmarked, setBookmarked] = useState(
    isBookmarked || latestComment?.isBookmarked
  );

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

  const [
    createBookmark,
    {
      data: createBookData,
      isSuccess: createBookIsSuccess,
      isLoading: createBookIsLoading,
      isError: createBookIsError,
      error: createBookError,
    },
  ] = useCreateBookmarkMutation();

  const [
    deleteBookmark,
    {
      data: deleteBookData,
      isLoading: deleteBookIsLoading,
      isSuccess: deleteBookIsSuccess,
      isError: deleteBookIsError,
      error: deleteBookError,
    },
  ] = useDeleteBookmarkMutation();

  const handleCreateBookmark = () => {
    createBookmark({
      postId: comment?._id,
      postType: 'Comment',
    });
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(comment._id);
  };

  const handleLikeComment = () => {
    likeComment(comment?._id);
  };

  useEffect(() => {
    if (likeCommentIsSuccess) {
      setLatestComment(likeCommentData?.data);
      setLikeAnimation(true);

      setTimeout(() => {
        setLikeAnimation(false);
      }, 1000);
    }
    if (likeCommentIsError) {
      setQueryError(likeCommentError?.message);
    }
  }, [likeCommentIsSuccess, likeCommentIsError.likeCommentData]);

  // handle scroll to the comment
  useEffect(() => {
    if (location?.state?.postId && location?.pathname.includes('post')) {
      const postElement = document.getElementById(location?.state?.postId);
      postElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      postElement?.classList.add('highlight');
      setTimeout(() => {
        postElement?.classList.remove('highlight');
      }, 7000);
    }
    // remove the postId from the location state
    navigate(location?.pathname, { replace: true });
  }, [location?.state]);

  useEffect(() => {
    if (comment && !isBookmarked) {
      setBookmarked(comment?.isBookmarked);
    } else if (isBookmarked) {
      setBookmarked(isBookmarked);
    }
  }, [comment, isBookmarked]);

  return (
    <>
      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      <div
        className={`flex w-full flex-col gap-4 border-b border-b-neutral-400 py-4
        ${
          location.pathname.includes('bookmarks')
            ? ' transition-all duration-150 ease-in-out hover:bg-gray-300/25 '
            : ''
        }
        `}
        id={latestComment?._id}
      >
        <div className="flex items-center gap-2">
          <Link
            to={
              latestComment?.author?._id === user?._id
                ? `/dashboard/account`
                : `/dashboard/users/${latestComment?.author._id}`
            }
            className="h-10 w-10 overflow-hidden rounded-full"
          >
            {latestComment?.author?.profilePicture ? (
              <img
                src={latestComment?.author?.profilePicture}
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
                latestComment?.author?._id === user?._id
                  ? `/dashboard/account`
                  : `/dashboard/users/${latestComment?.author._id}`
              }
              className="font-semibold text-neutral-900"
            >
              {latestComment?.author.firstName} {latestComment?.author.lastName}
            </Link>
            <div className="text-[0.8rem] text-neutral-600">
              {<ReactTimeAgo date={latestComment?.createdAt} locale="en-US" />}
            </div>
          </div>
        </div>

        {location.pathname.includes('bookmarks') ? (
          <Link
            to={`/dashboard/feed/post/${latestComment?.post}`}
            className="flex flex-col gap-[0.8rem] overflow-hidden font-medium text-neutral-900 "
            state={{ postId: latestComment?._id }}
          >
            <div className="">
              <p>{latestComment?.content}</p>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col gap-[0.8rem] overflow-hidden font-medium text-neutral-900 ">
            <div className="">
              <p>{latestComment?.content}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-[0.8rem] ">
            <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={
                  latestComment?.upvotedBy?.includes(user?._id)
                    ? 'red'
                    : '#FFFFFF'
                }
                onClick={handleLikeComment}
                className={`cursor-pointer ${likeAnimation && 'animate-like'} `}
              >
                <path
                  d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                  stroke={
                    latestComment?.upvotedBy?.includes(user?._id)
                      ? 'red'
                      : '#343A40'
                  }
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div
                className={` ${likeAnimation && 'animate-like'}`}
                style={{
                  color: latestComment?.upvotedBy?.includes(user?._id)
                    ? 'red'
                    : '#343A40',
                }}
              >
                {latestComment?.upvotedBy?.length}
              </div>
            </div>
            <div className="h-5 w-[1px] bg-neutral-600 "></div>

            <div className="">
              {!bookmarked ? (
                <BsBookmarkPlus
                  size={17}
                  color="#555555"
                  className="cursor-pointer"
                  onClick={handleCreateBookmark}
                />
              ) : (
                <FcBookmark
                  size={20}
                  className="cursor-pointer"
                  onClick={handleDeleteBookmark}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Postcomment;
