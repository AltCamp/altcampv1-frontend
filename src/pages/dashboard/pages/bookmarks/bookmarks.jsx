import React, { useState, useEffect, useRef } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';

import BookmarkCard from './bookmarkCard';

import { RiArrowDownSLine } from 'react-icons/ri';

import { useGetAllBookmarksQuery } from '../../../../app/slices/apiSlices/contentsSlice';

import EmptyBookmark from '../../../../assets/general/EmptyNotification.png';

import Pagination from '../../components/pagination';

export default function Bookmarks() {
  const [isActionOpen, setActionOpen] = useState(false);
  const [emptyBookmark, setEmptyBookmark] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error, isSuccess } = useGetAllBookmarksQuery({
    page: searchParams.get('page') ? searchParams.get('page') : 1,
  });
  const bookmarks = data?.data;
  const meta = data?.meta;

  const bookmarkRef = useRef(null);

  const handleToggleAction = () => {
    setActionOpen(!isActionOpen);
  };

  useEffect(() => {
    if (bookmarks?.length === 0) {
      setEmptyBookmark(true);
    } else {
      setEmptyBookmark(false);
    }
  }, [bookmarks]);

  useEffect(() => {
    if (data) {
      bookmarkRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [searchParams.get('page')]);

  const navigate = useNavigate();

  return (
    <div
      ref={bookmarkRef}
      className="relative mx-auto mb-16 h-auto w-full overflow-y-scroll p-8 tab:w-[75%] md:p-4 sm:w-full xs:pb-32"
    >
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-[1.2rem] font-semibold ">Bookmarks</h2>

        {/* NavBar */}
        <div className="flex w-full items-center gap-2 font-poppins  ">
          <div className="relative h-full ">
            <button
              className="auth-btn mt-0 flex items-center gap-1 px-2 sm:px-1 sm:text-[13px]  "
              // onClick={handleToggleAction}
            >
              <span>Action</span>
              <RiArrowDownSLine className="" size="20" color="#fff" />
            </button>
            {isActionOpen && (
              <div className="absolute z-10 mt-1 flex w-[10rem] flex-col overflow-hidden rounded-br-lg border border-neutral-500 bg-[#fafafa] text-[14px] shadow-lg ">
                <span
                  className="cursor-pointer border border-b border-neutral-500 p-1 transition-all duration-100 hover:bg-yellow-100  "
                  onClick={handleToggleAction}
                >
                  Select Bookmarks
                </span>
                <span
                  className="cursor-pointer border border-b border-neutral-500 p-1 transition-all duration-100 hover:bg-yellow-100 "
                  onClick={handleToggleAction}
                >
                  Forward
                </span>
              </div>
            )}
          </div>
          <input
            type="text"
            id="search"
            name="search"
            className="input"
            placeholder="Search bookmarks ..."
          />
        </div>

        {isLoading && (
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
        {isSuccess && bookmarks.length > 0 && (
          <>
            {/* Card */}
            <div className="my-8 flex w-full flex-col ">
              {bookmarks.map((bookmark) => (
                <BookmarkCard bookmark={bookmark} key={bookmark?._id} />
              ))}
            </div>

            {/* Pagination */}

            {bookmarks.length > 0 && (
              <Pagination
                meta={meta}
                page={page}
                setPage={setPage}
                setSearchParams={setSearchParams}
              />
            )}
          </>
        )}
      </div>

      {emptyBookmark && !isLoading && (
        <div className="mt-8 flex w-full flex-col items-center gap-4 ">
          <img
            src={EmptyBookmark}
            alt="empty bookmark"
            className="mx-auto w-[14rem]"
          />
          <p className="flex flex-col items-center gap-2">
            <span className="text-center font-medium">
              No bookmarks here yet!
            </span>
            <span className="text-center ">
              Bookmark your favorite posts, questions, and answers
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
