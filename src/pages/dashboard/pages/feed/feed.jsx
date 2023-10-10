import { useEffect, useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import { ProfileCircle, CloseCircle } from 'iconsax-react';

import { RiImageLine } from 'react-icons/ri';

import Postcard from './postcard';

import { useGetAllPostsQuery } from '../../../../app/slices/apiSlices/contentsSlice';

import { useSelector } from 'react-redux';

export default function Feed() {
  const { user } = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isLoading, isSuccess, isError, error } = useGetAllPostsQuery({
    page,
  });

  const posts = data?.data;

  const meta = data?.meta;

  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    if (isSuccess) {
      setAllPosts(posts);
      console.log(allPosts);
    }
  }, [data]);

  return (
    <div className="h-auto  w-full overflow-scroll p-8 pb-11 md:p-2 xs:p-0 xs:pb-36">
      <Outlet />
      <div className="mx-auto flex h-full w-full max-w-[40rem] flex-col gap-4 pt-4 md:gap-8 md:p-4">
        <div className="">
          <h1 className="text-[20px] font-medium text-neutral-900 ">Feed</h1>
          <p className="text-[14px] text-neutral-600 ">
            Explore and see what other people have posted
          </p>
        </div>

        <div className="flex h-fit w-full items-center gap-2 rounded-md bg-white px-4 py-2 text-[0.9rem] text-neutral-600 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.1)]">
          <div className="flex h-full w-[4rem] justify-center">
            <Link
              to={`/dashboard/account`}
              className="h-10 w-10 overflow-hidden rounded-full "
            >
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
            </Link>
          </div>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="h-full w-full cursor-text rounded-[8px] 
            border-[1px] border-neutral-400 bg-white px-4 py-2 text-[0.9rem] text-neutral-600 placeholder-neutral-500 shadow-[0px_2px_2px_rgba(33,_37,_41,_0.06),0px_0px_1px_rgba(33,_37,_41,_0.08)] outline-none "
            onFocus={() => navigate('/dashboard/feed/createpost')}
          />
          <div className="w-10 cursor-pointer">
            <RiImageLine size="24" color="#555555" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
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
          {posts &&
            !isLoading &&
            allPosts?.map((post) => <Postcard key={post._id} post={post} />)}
        </div>

        {posts && allPosts && (
          <div className="items-centerw-full flex justify-center">
            <button
              className="ease h-fit w-fit cursor-pointer rounded-[8px] border border-secondary-400 bg-transparent px-3 py-1 text-[0.9rem] text-secondary-400 outline-none transition-all duration-200 hover:border-none hover:bg-secondary-400 hover:text-white "
              // onclick set page to current page + 1 and set allPosts to allPosts + posts
              onClick={() => {
                setPage(page + 1);
                setAllPosts([...allPosts, ...posts]);
              }}
              disabled={isLoading || page === meta?.totalPages}
              style={{
                display: page === meta?.totalPages ? 'none' : 'flex',
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
