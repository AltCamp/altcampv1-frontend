import { useEffect, useState } from 'react';

import Questioncard from './questioncard';

import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import { useGetAllQuestionsQuery } from '../../../../app/slices/apiSlices/communitySlice';

import { CloseCircle } from 'iconsax-react';

import greenCheck from '../../../../assets/general/greencreatepostcheck.svg';

import Pagination from '../../components/pagination';

import { Helmet } from 'react-helmet-async';

export default function Community() {
  const [sortedQuestions, setSortedQuestions] = useState();
  const [createDeleteModal, setCreateDeleteModal] = useState(false);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get('page'))

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllQuestionsQuery({
      page: searchParams.get('page') ? searchParams.get('page') : 1,
    });

  const questions = data?.data;

  const meta = data?.meta;

  // console.log(meta)

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0);
    }
  }, [searchParams.get('page'), data]);

  const navigate = useNavigate();

  const location = useLocation();

  // check location state for new post created and clear it after handleNewPostCreated is called

  useEffect(() => {
    if (location.state) {
      if (location.state.created || location.state.deleted) {
        setCreateDeleteModal(true);
      } else {
        setCreateDeleteModal(false);
      }
    }
  }, [location]);

  const handleCreateDeleteModal = () => {
    setCreateDeleteModal(!createDeleteModal);
    // reload the page
    // window.location.reload()
    navigate(location.pathname, { state: {} });
  };

  useEffect(() => {
    if (createDeleteModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [createDeleteModal]);

  return (
    <div className="mb-16 flex h-full w-full overflow-scroll p-8 md:p-4 ">
      {/* <Helmet>
        <title>{`AltCamp-Dashboard-Community`}</title>
        <meta
          name='description'
          content={`A repository of questions and answers`}
        />
        <link rel='canonical' href={`dashboard/community`} />
      </Helmet> */}
      {createDeleteModal && (
        <div className="fixed bottom-0 left-0 top-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center overflow-hidden bg-black/50 ">
          <div className="relative flex h-[20rem] w-[20rem] flex-col items-center justify-center gap-8 rounded-[4px] bg-white p-8 md:h-[15rem] md:w-[15rem] xs:h-[12rem] xs:w-[12rem] xs:gap-2 xs:p-4 ">
            <CloseCircle
              size="20"
              className="absolute -right-8 top-0 cursor-pointer text-white "
              onClick={handleCreateDeleteModal}
            />
            <div className="">
              <img src={greenCheck} alt="" className="w-20 md:w-16 xs:w-12" />
            </div>
            <p className="text-center text-[15px] font-semibold text-neutral-900 ">
              {location.state.created
                ? 'Your question has been submitted successfully.'
                : location.state.deleted
                ? 'Your question has been deleted successfully.'
                : ''}
            </p>
            <button className="auth-btn" onClick={handleCreateDeleteModal}>
              Done
            </button>
          </div>
        </div>
      )}
      <div className="flex w-full flex-col gap-8">
        <div className="flex w-full items-center justify-between  ">
          <div className="w-fit">
            <h1 className="text-[20px] font-semibold text-neutral-900 ">
              Community
            </h1>
            <p className="text-[14px] text-neutral-600 ">
              Share what you know even and also ask about what you do not know
            </p>
          </div>
          <Link
            to={'/dashboard/community/ask'}
            className="auth-btn sm:min-w-40 flex w-fit items-center justify-center gap-1 px-2 sm:h-8 sm:w-40"
          >
            <span className="">Ask</span>
            <span className="">Question</span>
          </Link>
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
          {questions?.map((question) => (
            <Questioncard key={question._id} question={question} />
          ))}
        </div>

        {/* pagination */}
        {questions && questions.length > 0 && (
          <Pagination
            meta={meta}
            page={page}
            setPage={setPage}
            setSearchParams={setSearchParams}
          />
        )}
      </div>
    </div>
  );
}
