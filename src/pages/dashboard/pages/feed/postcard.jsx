import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { ProfileCircle, MessageText1 } from 'iconsax-react';

import { BsFillBookmarkFill, BsBookmarkPlus } from 'react-icons/bs';

import ReactTimeAgo from 'react-time-ago';

import { useLikePostMutation } from '../../../../app/slices/apiSlices/feedSlice';

import { useSelector } from 'react-redux';

import BookmarkModal from '../../components/bookmarkmodal/bookmarkmodal';

import VerifyEmailPopUp from '../../components/verifyEmailPopUp';

export default function Postcard({ post, postSuccess }) {
  const [latestPost, setLatestPost] = useState(post);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [toggleBookmarkModal, setToggleBookmarkModal] = useState();

  const [queryError, setQueryError] = useState();

  const { user } = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  const [likePost, { data, isLoading, isSuccess, isError, error }] =
    useLikePostMutation();

  const handleLikePost = () => {
    likePost(post._id);
  };

  useEffect(() => {
    if (isSuccess) {
      // setLatestPost(data?.data);
      setLikeAnimation(true);

      setTimeout(() => {
        setLikeAnimation(false);
      }, 1100);
    }
    if (isError) {
      setQueryError(error?.data.message);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (post) {
      setLatestPost(post);
    }
  }, [postSuccess, post, isSuccess]);

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal);
  };

  // console.log(latestPost?.author?._id)

  return (
    <>
      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={post?._id}
          postType={`Post`}
          postTitle={post?.content}
        />
      )}
      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      <Link
        to={`/dashboard/feed/post/${latestPost?._id}`}
        className="decoration-none p-6 shadow-[0px_3.31218px_19.8731px_rgba(86,_86,_86,_0.15)] "
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2">
            <Link
              to={
                user?._id === latestPost?.author?._id
                  ? `/dashboard/account`
                  : `/dashboard/users/${latestPost?.author?._id}`
              }
              className="h-10 w-10 overflow-hidden rounded-full"
            >
              {latestPost?.author?.profilePicture ? (
                <img
                  src={latestPost?.author?.profilePicture}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <ProfileCircle
                  size={45}
                  color="#555555"
                  className="h-full w-full object-cover"
                />
              )}
            </Link>
            <div className="flex flex-col">
              <Link
                to={
                  user?._id === latestPost?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${latestPost?.author?._id}`
                }
                className="font-semibold text-neutral-900"
              >
                {latestPost?.author?.firstName} {latestPost?.author?.lastName}
              </Link>
              <div className="text-[0.8rem] text-neutral-600">
                {<ReactTimeAgo date={latestPost.createdAt} locale="en-US" />}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3.5 overflow-hidden font-medium text-neutral-900">
            <div className="">
              <p>{latestPost.content}</p>
            </div>
            {/* <div className={postCardStyles.media}>
            <img src={postMedia} alt='' className='' />
          </div> */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-[0.8rem] ">
              <Link
                to={`/dashboard/feed`}
                className="flex items-center gap-[0.3rem] font-medium text-neutral-600 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={
                    latestPost?.upvotedBy?.includes(user?._id)
                      ? 'red'
                      : '#FFFFFF'
                  }
                  onClick={handleLikePost}
                  className={`cursor-pointer ${
                    likeAnimation && 'animate-like'
                  }`}
                >
                  <path
                    d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                    stroke={
                      latestPost?.upvotedBy?.includes(user?._id)
                        ? 'red'
                        : '#343A40'
                    }
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div
                  className={`${likeAnimation && 'animate-like'}`}
                  style={{
                    color: latestPost?.upvotedBy?.includes(user?._id)
                      ? 'red'
                      : '#343A40',
                  }}
                >
                  {latestPost.upvotedBy?.length}
                </div>
              </Link>
              <div className="w-[1px] bg-neutral-600 "></div>
              <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
                <MessageText1
                  size={20}
                  color="#555555"
                  className="cursor-pointer"
                />
                <div className="">{latestPost.comments?.length}</div>
              </div>
            </div>
            <div className="">
              <Link to={`/dashboard/feed`} className="w-fit">
                {!latestPost.isBookmarked ? (
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
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
