import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  ArrowDown,
  ArrowUp,
  ArchiveAdd,
  Edit,
  ProfileCircle,
} from 'iconsax-react';

import { BsFillBookmarkFill, BsBookmarkPlus } from 'react-icons/bs';

import ReactTimeAgo from 'react-time-ago';

import { useSelector } from 'react-redux';

import BookmarkModal from '../../components/bookmarkmodal/bookmarkmodal';

import { useDeleteBookmarkMutation } from '../../../../app/slices/apiSlices/bookmarkSlice';

export default function Questioncard({ question }) {
  // console.log(bookmarkState)

  const [toggleBookmarkModal, setToggleBookmarkModal] = useState();
  const { user } = useSelector((state) => state?.user?.user);

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal);
  };

  const [deleteBookmark, { isSuccess, isLoading, isError, error }] =
    useDeleteBookmarkMutation();

  return (
    <>
      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={question._id}
          postType={`Question`}
          postTitle={question.title}
        />
      )}
      <div className="flex h-fit w-full flex-col gap-[0.2rem] rounded-[5px] px-3 py-4 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.1)] sm:h-auto sm:gap-4 ">
        <div className="flex flex-col items-start justify-between gap-1 ">
          <Link
            to={`/dashboard/community/question/${question._id}/${question.slug}`}
            // state={{ question: question._id }}
          >
            <h3 className="text-[18px] text-neutral-900">{question.title}</h3>
          </Link>
          <div className="flex gap-1">
            <span className="cursor-pointer rounded-[4px] bg-primary-400 px-1 py-[0.2rem] text-center text-[12px] font-medium text-neutral-900 transition-all duration-200 ease-in-out hover:bg-primary-300 ">
              UI/UX
            </span>
            <span className="cursor-pointer rounded-[4px] bg-primary-400 px-1 py-[0.2rem] text-center text-[12px] font-medium text-neutral-900 transition-all duration-200 ease-in-out hover:bg-primary-300 ">
              Design
            </span>
          </div>
        </div>

        <div className="flex h-full w-full items-end justify-between sm:flex-col-reverse sm:items-start ">
          <div className="flex flex-col gap-4 sm:w-full sm:flex-row sm:justify-between ">
            <div className="flex items-center gap-[0.3rem] text-[13px] text-neutral-600 ">
              <span className="font-semibold">
                {question.answer.length}
                {question.answer.length > 1 ? ' Answers' : ' Answer'}
              </span>
              <span className="">|</span>
              <span className="">
                <span className="xs:hidden">Requested </span>
                {<ReactTimeAgo date={question.createdAt} locale="en-US" />}
              </span>
            </div>

            <div className="flex items-center gap-5 text-[13px] text-neutral-600 ">
              <div
                className="flex items-center font-medium text-[#0e8a1a] "
                style={{
                  color: question?.upvotes > 0 ? '#0e8a1a' : '#343a40',
                }}
              >
                <ArrowUp size="19" className="" />
                {question.upvotes}
              </div>
              <div
                className="flex items-center font-medium text-neutral-800 "
                style={{
                  color: question?.downvotes > 0 ? '#dc3545' : '#343a40',
                }}
              >
                <ArrowDown size="19" className="" />
                {question.downvotes}
              </div>
              <div className="text-neutral-800 ">
                {!question.isBookmarked ? (
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

          <div className="flex cursor-pointer items-center gap-2 text-[13px] text-neutral-600 ">
            <div className="flex items-center gap-2 font-medium text-secondary-600 ">
              <Link
                to={
                  user?._id === question?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${question?.author?._id}`
                }
                className="h-7 w-7 overflow-hidden rounded-full sm:h-6 sm:w-6"
              >
                {question?.author?.profilePicture ? (
                  <img
                    src={question?.author?.profilePicture}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ProfileCircle
                    color="#555555"
                    className="h-full w-full object-cover"
                  />
                )}
              </Link>
              <Link
                to={
                  user?._id === question?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${question?.author?._id}`
                }
                className="text-inherit"
              >
                {question.author?.firstName} {question.author?.lastName}
              </Link>
            </div>
            <span className="sm:hidden">|</span>
            <Link
              to={`/dashboard/community/question/${question._id}/${question.slug}`}
              // state={{ question: question._id }}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[1rem] border-2 border-secondary-400 px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ease-in-out hover:bg-secondary-400 hover:text-white sm:hidden "
            >
              <Edit size="17" className="" />
              Answer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
