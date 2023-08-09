import { useState, useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ArrowDown, ArrowUp, Edit } from 'iconsax-react';

import { BsBookmarkPlus } from 'react-icons/bs';

import { FcBookmark } from 'react-icons/fc';

import ReactTimeAgo from 'react-time-ago';
import DOMPurify from 'isomorphic-dompurify';
import { Tooltip } from 'flowbite-react';

import {
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
  useUpdateAnswerMutation,
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from '../../../../../app/slices/apiSlices/contentsSlice';

import { useSelector } from 'react-redux';
import RichEditor from '../richeditor';

import VerifyEmailPopUp from '../../../components/verifyEmailPopUp';

// import prsims modules for code highlighting and sytyling
// import Prism from 'prismjs'

export default function Answercard({ answer, isBookmarked }) {
  const [content, setContent] = useState(answer?.content);
  const [latestAnswer, setLatestAnswer] = useState(answer);
  const [editMode, setEditMode] = useState(false);
  const [bookmarked, setBookmarked] = useState(
    isBookmarked || latestAnswer?.isBookmarked
  );

  // stored and passed as props to verifyemailpopup modal
  const [queryError, setQueryError] = useState();

  const clean = DOMPurify.sanitize(answer?.content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  });

  const { user } = useSelector((state) => state?.user.user);

  const location = useLocation();

  const navigate = useNavigate();

  const answerId = answer?._id;

  const [
    upvoteAnswer,
    {
      data: upvoteData,
      isSuccess: upvoteSuccess,
      isLoading: upvoteLoading,
      isError: upvoteIsError,
      error: upvoteError,
    },
  ] = useUpvoteAnswerMutation();

  const [
    downvoteAnswer,
    {
      data: downvoteData,
      isSuccess: downvoteSuccess,
      isLoading: downvoteLoading,
      isError: downvoteIsError,
      error: downvoteError,
    },
  ] = useDownvoteAnswerMutation();

  const [
    updateAnswer,
    {
      data: updateAnswerData,
      isSuccess: updateAnswerSuccess,
      isLoading: updateAnswerLoading,
      isError: updateAnswerIsError,
      error: updateAnswerError,
    },
  ] = useUpdateAnswerMutation();

  const handleUpvoteAnswer = () => {
    upvoteAnswer(answerId);
  };

  const handleDownvoteAnswer = () => {
    downvoteAnswer(answerId);
  };

  const handleUpdateAnswer = () => {
    updateAnswer({
      answerId,
      body: {
        content: `Edited: ${content}`,
      },
    });
  };

  useEffect(() => {
    if (upvoteSuccess) {
      setLatestAnswer(upvoteData?.data);
    } else if (downvoteSuccess) {
      setLatestAnswer(downvoteData?.data);
    } else {
      setLatestAnswer(answer);
    }
  }, [upvoteData, upvoteSuccess, downvoteData, downvoteSuccess]);

  useEffect(() => {
    if (updateAnswerSuccess) {
      setEditMode(false);
    }
  }, [updateAnswerSuccess]);

  const highlight = `bg-neutral-400 rounded-2 p-2 animate-highlights`;

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

  // grab all the errors from api queries and pass the message to queryError state
  useEffect(() => {
    if (upvoteIsError || downvoteIsError || updateAnswerIsError) {
      setQueryError(
        error?.data?.message ||
          downvoteError?.data?.message ||
          updateAnswerError?.data.message
      );
    }
  }, [upvoteIsError, downvoteIsError, updateAnswerIsError]);

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
      postId: answer?._id,
      postType: 'Answer',
    });
  };

  const handleDeleteBookmark = () => {
    deleteBookmark(answer._id);
  };

  useEffect(() => {
    if (answer && !isBookmarked) {
      setBookmarked(answer?.isBookmarked);
    } else if (isBookmarked) {
      setBookmarked(isBookmarked);
    }
  }, [answer, isBookmarked]);

  return (
    <>
      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      <div
        className={`flex flex-col gap-2
      ${
        location.pathname.includes('bookmarks')
          ? ' border-b border-b-neutral-400 px-0 py-4 transition-all duration-150 ease-in-out hover:bg-gray-300/25 '
          : ''
      }
      `}
        id={answer?._id}
      >
        {editMode ? (
          <div className="flex w-full flex-col gap-2">
            <RichEditor setBody={setContent} body={content} />
            <div className="flex w-full justify-end gap-2">
              <button
                className="flex w-fit items-center justify-center rounded-[4px] bg-secondary-200 px-4 py-2 font-semibold outline-none "
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="auth-btn mt-0 h-fit w-fit px-4 py-2 "
                onClick={handleUpdateAnswer}
                disabled={updateAnswerLoading}
                style={{
                  cursor: updateAnswerLoading ? 'not-allowed' : 'pointer',
                  opacity: updateAnswerLoading ? '0.7' : '1',
                }}
              >
                {updateAnswerLoading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-neutral-600 ">
              <Link
                to={
                  user?._id === latestAnswer?.author?._id
                    ? '/dashboard/account'
                    : `/dashboard/users/${latestAnswer?.author?._id}`
                }
                className="font-medium text-inherit "
              >
                {latestAnswer?.author?.firstName}{' '}
                {latestAnswer?.author?.lastName}{' '}
                {latestAnswer?.author?.accountType == 'Mentor' && (
                  <span className="w-fit rounded-[4px] bg-secondary-300 p-1 text-[11px] font-medium uppercase ">
                    Instructor
                  </span>
                )}
              </Link>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 "></span>
              <span className="text-[14px] ">
                <ReactTimeAgo date={latestAnswer?.createdAt} locale="en-US" />
              </span>
            </div>
            {location.pathname.includes('bookmarks') ? (
              <Link
                to={`/dashboard/community/question/${latestAnswer?.question?._id}/${latestAnswer?.question?.slug}`}
                className="font-light leading-normal text-neutral-900 "
              >
                <div
                  className="w-full "
                  dangerouslySetInnerHTML={{ __html: latestAnswer?.content }}
                />
              </Link>
            ) : (
              <div className="font-light leading-normal text-neutral-900 ">
                <div
                  className="w-full "
                  dangerouslySetInnerHTML={{ __html: latestAnswer?.content }}
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <div
                className="flex items-center gap-1 "
                style={{
                  color: latestAnswer?.upvotedBy.includes(user?._id)
                    ? '#0e8a1a'
                    : '#343a40',
                }}
              >
                <Tooltip content="Upvote" placement="top" style="light">
                  <ArrowUp
                    size="19"
                    className="cursor-pointer text-inherit"
                    onClick={handleUpvoteAnswer}
                  />
                </Tooltip>
                {latestAnswer?.upvotedBy.length}
              </div>
              <div
                className="flex items-center gap-1 "
                style={{
                  color: latestAnswer?.downvotedBy.includes(user?._id)
                    ? '#dc3545'
                    : '#343a40',
                }}
              >
                <Tooltip content="Downvote" placement="top" style="light">
                  <ArrowDown
                    size="19"
                    className="cursor-pointer text-inherit"
                    onClick={handleDownvoteAnswer}
                  />
                </Tooltip>
                {latestAnswer?.downvotedBy.length}
              </div>
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
              {user?._id === latestAnswer?.author?._id && (
                <div className="" onClick={() => setEditMode(!editMode)}>
                  <Edit size="19" className="cursor-pointer text-inherit" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
