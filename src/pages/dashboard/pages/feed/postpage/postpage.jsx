import { useState, useEffect, useRef } from 'react';

import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

import { BsBookmarkPlus, BsFillBookmarkFill } from 'react-icons/bs';

import {
  ArrowCircleLeft,
  ProfileCircle,
  MessageText1,
  Send2,
} from 'iconsax-react';

import ReactTimeAgo from 'react-time-ago';

import {
  useLikePostMutation,
  useGetPostByIdQuery,
  useGetAllCommentsQuery,
  useCreateCommentMutation,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from '../../../../../app/slices/apiSlices/contentsSlice';

import { useSelector } from 'react-redux';

import Postcomment from './postcomment';

import VerifyEmailPopUp from '../../../components/verifyEmailPopUp';

export default function Postpage() {
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [content, setContent] = useState('');

  // stored and passed as props to verifyemailpopup modal
  const [queryError, setQueryError] = useState();

  // refs
  const commentsRef = useRef([]);
  const commentWrapperRef = useRef(null);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state?.user?.user);

  const { postId } = useParams();

  const {
    data: singlePost,
    isLoading: singlePostLoading,
    isSuccess: singlePostSuccess,
    isError: singlePostIsError,
    error: singlePostError,
  } = useGetPostByIdQuery(postId);

  useEffect(() => {
    if (singlePostError) {
      navigate(-1);
    }
  }, [singlePostError]);

  const [
    likePost,
    {
      data: likeData,
      isLoading: likeIsLoading,
      isSuccess: likeIsSuccess,
      isError: likeIsError,
      error: likeError,
    },
  ] = useLikePostMutation();

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
      postId: postId,
      postType: 'Post',
    });
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(postId);
  };

  const handleLikePost = () => {
    likePost(postId);
  };

  useEffect(() => {
    if (likeIsSuccess && singlePost) {
      setLikeAnimation(true);

      setTimeout(() => {
        setLikeAnimation(false);
      }, 1000);
    }
  }, [singlePost]);

  const {
    data: comments,
    isLoading: commentsLoading,
    isSuccess: commentsSuccess,
    isError: commentsIsError,
    error: commentsError,
  } = useGetAllCommentsQuery(postId);

  const commentList = comments?.data;

  const [
    createComment,
    {
      data: createCommentData,
      isLoading: createCommentLoading,
      isSuccess: createCommentSuccess,
      isError: createCommentIsError,
      error: createCommentError,
    },
  ] = useCreateCommentMutation();

  const handleCreateComment = (e) => {
    createComment({ content, postId });
  };

  useEffect(() => {
    if (createCommentSuccess) {
      setContent('');
      // scroll to the botttom of the page
      commentWrapperRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [createCommentData]);

  const post = singlePost?.data;

  // grab all the errors from api queries and pass the message to queryError state
  useEffect(() => {
    if (createCommentIsError || likeIsError) {
      setQueryError(
        createCommentError?.data?.message || likeError?.data?.message
      );
    }
  }, [createCommentIsError, likeIsError]);

  return (
    <>
      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      <div
        id="postpage"
        className="mx-auto flex h-screen w-full max-w-[40rem] flex-col px-6 py-8 xs:w-full "
      >
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowCircleLeft size="24" color="#1E1E1E" />
        </div>

        {singlePostLoading && (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {singlePostSuccess && (
          <div className="flex h-screen w-full flex-col gap-8 md:mt-4">
            <div className="h-full">
              <div className="mt-6 flex w-full flex-col gap-8 ">
                <div className="flex items-start gap-2">
                  <Link
                    to={
                      post?.author?._id === user?._id
                        ? '/dashboard/account'
                        : `/dashboard/users/${post?.author._id}`
                    }
                    className="h-10 w-10 overflow-hidden rounded-full"
                  >
                    {post?.author?.profilePicture ? (
                      <img
                        src={post?.author?.profilePicture}
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
                        post?.author?._id === user?._id
                          ? '/dashboard/account'
                          : `/dashboard/users/${post?.author._id}`
                      }
                      className="font-semibold text-neutral-900"
                    >
                      {post?.author.firstName} {post?.author.lastName}
                    </Link>
                    <div className="text-[0.8rem] text-neutral-600 ">
                      {<ReactTimeAgo date={post?.createdAt} locale="en-US" />}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[0.8rem] overflow-hidden font-medium text-neutral-900 ">
                  <div className="">
                    <p>{post?.content}</p>
                  </div>
                  <div
                    className={`flex h-auto max-h-[22rem] w-full items-center justify-between gap-2
           
            `}
                  >
                    {post?.media.map((media, index) => (
                      // <div key={index} className="relative h-full w-full">
                      <img
                        key={index}
                        src={media.url}
                        alt={`Post media`}
                        className="h-full w-full overflow-hidden object-cover"
                      />
                      // </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-[0.8rem] ">
                    <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={
                          post?.upvotedBy?.includes(user?._id)
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
                            post?.upvotedBy?.includes(user?._id)
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
                          color: post?.upvotedBy?.includes(user?._id)
                            ? 'red'
                            : '#343A40',
                        }}
                      >
                        {post?.upvotedBy?.length}
                      </div>
                    </div>
                    <div className="w-[1px] bg-neutral-600 "></div>
                    <div className="flex items-center gap-[0.3rem] font-medium text-neutral-600 ">
                      <MessageText1
                        size={20}
                        color="#555555"
                        className="cursor-pointer"
                      />
                      <div className="">{post?.comments?.length}</div>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      {!post.isBookmarked ? (
                        <BsBookmarkPlus
                          size={17}
                          color="#555555"
                          className="cursor-pointer"
                          onClick={handleCreateBookmark}
                        />
                      ) : (
                        <BsFillBookmarkFill
                          size={20}
                          className="cursor-pointer"
                          onClick={handleDeleteBookmark}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-neutral-400 "></div>

            <div ref={commentWrapperRef} className="mb-0">
              <div className="">All Comments</div>

              <div className="flex flex-col items-center gap-[0.3rem] font-medium text-neutral-600 ">
                {commentList?.map((comment) => (
                  <Postcomment key={comment._id} comment={comment} />
                ))}
              </div>
            </div>

            <div className="sticky bottom-6 z-10 flex h-14 w-full items-center justify-between gap-2 overscroll-none border border-neutral-400 bg-white px-4 py-[0.8rem] text-[0.9rem] text-neutral-600 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.1)] outline-none transition-all duration-200 ease-in-out focus-within:border-secondary-400 ">
              <div className="flex h-full w-[3rem] items-center justify-center">
                <div className="h-10 w-10 overflow-hidden rounded-full ">
                  {user?.profilePicture ? (
                    <img
                      src={user?.profilePicture}
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
                </div>
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                value={content}
                className="h-full w-full border-none text-[0.9rem] text-neutral-600 outline-none focus:ring-0 "
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateComment();
                  }
                }}
                disabled={createCommentLoading}
              />
              <div className="transistion-all cursor-pointer text-[#555555] ">
                {createCommentLoading ? (
                  <div className="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Send2
                    size="32"
                    color="#555555"
                    className=""
                    onClick={handleCreateComment}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
