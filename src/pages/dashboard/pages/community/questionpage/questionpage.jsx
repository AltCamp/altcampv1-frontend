import { useState, useEffect } from 'react';

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

import caution from '../../../../../assets/general/deletecaution.svg';

import {
  ArrowCircleLeft,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash,
  CloseCircle,
  ProfileCircle,
} from 'iconsax-react';

import { BsFillBookmarkFill, BsBookmarkPlus } from 'react-icons/bs';

import { AiOutlineShareAlt } from 'react-icons/ai';

import { Helmet } from 'react-helmet-async';
import { ShareSocial } from 'react-share-social';
// import { Tooltip } from 'react-tooltip';
import { Tooltip } from 'flowbite-react';

// import answercard
import Answercard from './answercard';

// import createanswer
import Createanswer from './createanswer';

import { useGetQuestionByIdQuery } from '../../../../../app/slices/apiSlices/communitySlice';

import { useUpvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlice';

import { useDownvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlice';

import { useGetAnswersQuery } from '../../../../../app/slices/apiSlices/communitySlice';

import { useDeleteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlice';

import ReactTimeAgo from 'react-time-ago';
import DOMPurify from 'isomorphic-dompurify';

import { useSelector } from 'react-redux';

import altlogo from '../../../../../assets/general/Authlogo.png';

import BookmarkModal from '../../../components/bookmarkmodal/bookmarkmodal';

import VerifyEmailPopUp from '../../../components/verifyEmailPopUp';
export default function Questionpage() {
  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [screenWidthState, setScreenWidthState] = useState(false);
  const [toggleBookmarkModal, setToggleBookmarkModal] = useState();

  const [queryError, setQueryError] = useState();

  const navigate = useNavigate();

  const location = useLocation();
  const { questionId } = useParams();

  // get currnet page address
  const shareLink = window.location.href;

  const { user } = useSelector((state) => state?.user.user);

  const {
    data: questionData,
    isLoading: questionLoading,
    isSuccess: questionSuccess,
    isError: questionIsError,
    error: questionError,
  } = useGetQuestionByIdQuery(questionId);

  const questionDetails = questionData?.data;

  useEffect(() => {
    if (questionIsError) {
      navigate(-1);
    }
  }, [questionIsError]);

  // console.log(questionId)

  const clean = DOMPurify.sanitize(questionDetails?.body, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
  });

  const [
    upvoteQuestion,
    {
      data: upvoteData,
      isLoading: upvoteLoading,
      isSuccess: upvoteSuccess,
      isError: upvoteIsError,
      error: upvoteError,
    },
  ] = useUpvoteQuestionMutation();

  const [
    downvoteQuestion,
    {
      data: downvoteData,
      isLoading: downvoteLoading,
      isSuccess: downvoteSuccess,
      isError: downvoteIsError,
      error: downvoteError,
    },
  ] = useDownvoteQuestionMutation();

  const handleUpvoteQuestion = () => {
    upvoteQuestion(questionId);
  };

  const handleDownvoteQuestion = () => {
    downvoteQuestion(questionId);
  };

  // logic for getting answers
  const { data: answersData, isSuccess: answersSuccess } =
    useGetAnswersQuery(questionId);

  const answers = answersData?.data;
  // console.log(answers)

  const [
    deleteQuestion,
    {
      data: deleteQuestionData,
      isLoading: deleteQuestionLoading,
      isSuccess: deleteQuestionSuccess,
      isError: deleteQuestionError,
      error: deleteQuestionErrors,
    },
  ] = useDeleteQuestionMutation();

  const handleDeleteQuestion = () => {
    deleteQuestion(questionId);
  };

  useEffect(() => {
    if (deleteQuestionSuccess) {
      navigate('/dashboard/community', { state: { deleted: true } });
    }
  }, [deleteQuestionSuccess]);

  const handleDeleteModal = () => {
    setDeleteQuestionModal(!deleteQuestionModal);
  };

  useEffect(() => {
    if (deleteQuestionModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [deleteQuestionModal]);

  useEffect(() => {
    const media = window.innerWidth;
    window.addEventListener('resize', () => {
      setScreenWidthState(media < 500);
    });
  }, []);

  // grab all the errors from api queries and pass the message to queryError state
  useEffect(() => {
    if (upvoteIsError || downvoteIsError || deleteQuestionError) {
      setQueryError(
        upvoteError?.data.message ||
          downvoteError?.data.message ||
          deleteQuestionErrors?.data.message
      );
    }
  }, [upvoteIsError, downvoteIsError, deleteQuestionError]);

  // style for share modal

  const style = {
    root: {
      background: 'white',
      borderRadius: 3,
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'black',
      // fontFamily: 'Poppins',
      height: 'auto',
      width: `${screenWidthState ? '18rem' : '25rem'}`,
      padding: '1rem',
      maxWidth: '30rem',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      // use inter from google as fontFamily
      fontFamily: 'Inter',
    },
    copyContainer: {
      border: '1px solid blue',
      background: 'rgb(0,0,0,0.7)',
    },
    title: {
      color: 'aquamarine',
      fontStyle: 'italic',
    },
  };

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal);
  };

  return (
    <>
      <Helmet>
        <title>
          {questionDetails?.title ? questionDetails?.title : 'Community'}
        </title>
        <meta name="description" content={`${questionDetails?.body}`} />
        <link rel="canonical" href={`/question/${questionDetails?.slug}`} />
        <meta property="og:title" content={questionDetails?.title} />
        <meta property="og:description" content={questionDetails?.body} />
        <meta property="og:url" content={shareLink} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={altlogo} />
        <meta property="og:image:alt" content={questionDetails?.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="AltCamp" />
      </Helmet>

      {/* verifyEmailPopUp */}
      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />

      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={questionDetails._id}
          postType={`Question`}
          postTitle={questionDetails.title}
        />
      )}
      {deleteQuestionModal && (
        <div className="fixed bottom-0 left-0 top-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center overflow-hidden bg-black/50 ">
          <div className="relative flex h-[20rem] w-[20rem] flex-col items-center justify-center gap-8 rounded-[4px] bg-white p-8 md:h-[15rem] md:w-[15rem] sm:h-[13rem] sm:w-[13rem] sm:gap-2 sm:p-4 ">
            <CloseCircle
              size="20"
              className="absolute -right-8 top-0 cursor-pointer text-white "
              onClick={handleDeleteModal}
            />
            <div className="">
              <img src={caution} alt="" className="w-20 md:w-16 sm:w-12" />
            </div>
            <p className="text-center text-[15px] font-semibold text-neutral-900 md:text-[14px] sm:text-[12px] ">
              You are about to delete this question. Do you want to proceed?
            </p>
            <div className="flex w-full items-center justify-center gap-6">
              <button
                className="flex w-full items-center justify-center rounded-[4px] border-none bg-secondary-200 px-6 py-3 font-semibold text-secondary-600 outline-none md:px-4 md:py-2 sm:px-3  "
                onClick={handleDeleteModal}
              >
                Cancel
              </button>
              <button
                className="flex w-full items-center justify-center rounded-[4px] border-none bg-secondary-200 px-6 py-3 font-semibold text-white outline-none md:px-4 md:py-2 sm:px-3 "
                onClick={handleDeleteQuestion}
                disabled={deleteQuestionLoading}
                style={{
                  backgroundColor: deleteQuestionLoading ? '#ccc' : '#FF5B5B',
                  cursor: deleteQuestionLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {deleteQuestionLoading ? 'Deleting...' : 'Proceed'}
              </button>
            </div>
          </div>
        </div>
      )}
      {questionLoading && (
        <div className="relative flex h-full w-full flex-col px-12 py-8 ">
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
        </div>
      )}
      {questionSuccess && (
        <div className="relative flex h-full w-full flex-col px-12 py-8 sm:px-3">
          <div className="flex w-full flex-col gap-8 border-b-2 border-neutral-300 pb-5 ">
            <div
              className="items-cenetr flex cursor-pointer gap-2 text-[14px] font-medium text-neutral-700 "
              onClick={() => navigate(-1)}
            >
              <ArrowCircleLeft size="23" className="" />
              <div className="">Back to community</div>
            </div>
            <div className="flex w-full items-start justify-between ">
              <div className="flex w-full flex-col gap-4">
                <div className="flex h-fit w-full items-start justify-between">
                  <div className="flex w-full flex-col gap-2">
                    <h3 className="text-[24px] text-neutral-900 sm:text-[16px]">
                      {questionDetails?.title}
                    </h3>
                    <div className="flex gap-2">
                      <span className="cursor-pointer rounded-[4px] bg-primary-400 px-1 py-[0.2rem] text-center text-[12px] font-medium text-neutral-900 transition-all duration-200 ease-in-out hover:bg-primary-300 ">
                        UI/UX
                      </span>
                      <span className="cursor-pointer rounded-[4px] bg-primary-400 px-1 py-[0.2rem] text-center text-[12px] font-medium text-neutral-900 transition-all duration-200 ease-in-out hover:bg-primary-300 ">
                        Design
                      </span>
                    </div>
                  </div>
                  <Link
                    to={'/dashboard/community/ask'}
                    className="auth-btn sm:min-w-40 flex w-fit items-center justify-center gap-1 px-2 sm:hidden"
                  >
                    <span className="">Ask</span>
                    <span className="">Question</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-[14px] font-medium ">
                  <div className="flex items-center gap-2 text-secondary-600 ">
                    <div className="h-6 w-6 overflow-hidden rounded-full ">
                      {questionDetails?.author?.profilePicture ? (
                        <img
                          src={questionDetails?.author?.profilePicture}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ProfileCircle
                          color="#555555"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <Link
                      to={
                        user?._id === questionDetails?.author?._id
                          ? `/dashboard/account`
                          : `/dashboard/users/${questionDetails?.author?._id}`
                      }
                      className="text-neutral-900"
                    >
                      {questionDetails?.author?.firstName}{' '}
                      {questionDetails?.author?.lastName}
                    </Link>
                  </div>

                  {user?._id === questionDetails?.author?._id && (
                    <Link
                      to={`/dashboard/community/editquestion`}
                      state={{
                        question: questionDetails?._id,
                        title: questionDetails?.title,
                        body: questionDetails?.body,
                      }}
                      className="flex items-center gap-1 text-neutral-700 transition-all duration-200 ease-in-out "
                    >
                      <Edit size="19" />
                      <p className="">Edit Question</p>
                    </Link>
                  )}
                </div>

                <div className="flex items-center justify-between text-[13px] xs:flex-col xs:items-start xs:gap-2">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <span className="">
                      <span className="sm:hidden">Requested </span>
                      {questionDetails && (
                        <ReactTimeAgo
                          date={questionDetails?.createdAt}
                          locale="en-US"
                        />
                      )}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-600  "></span>
                    <span className="font-semibold">
                      {questionDetails?.answer.length}
                      {questionDetails?.answer.length > 1
                        ? ' Answers'
                        : ' Answer'}
                    </span>
                    <div
                      className="flex items-center font-medium text-[#0e8a1a] "
                      onClick={handleUpvoteQuestion}
                      style={{
                        color:
                          questionDetails?.upvotes > 0 ? '#0e8a1a' : '#343a40',
                      }}
                    >
                      <Tooltip content="Upvote" placement="top" style="light">
                        <ArrowUp
                          size="19"
                          className="cursor-pointer text-inherit"
                        />
                      </Tooltip>
                      {questionDetails?.upvotes}
                    </div>
                    <div
                      className="flex items-center font-medium text-neutral-800 "
                      onClick={handleDownvoteQuestion}
                      style={{
                        color:
                          questionDetails?.downvotes > 0
                            ? '#dc3545'
                            : '#343a40',
                      }}
                    >
                      <Tooltip content="Downvote" placement="top" style="light">
                        <ArrowDown
                          size="19"
                          className="cursor-pointer text-inherit"
                        />
                      </Tooltip>
                      {questionDetails?.downvotes}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ">
                    {user?._id === questionDetails?.author?._id && (
                      <Tooltip content="Delete" placement="top" style="light">
                        <Trash
                          size="20"
                          className="cursor-pointer text-inherit"
                          onClick={handleDeleteModal}
                        />
                      </Tooltip>
                    )}
                    <div className="relative">
                      <Tooltip content="Share" placement="top" style="light">
                        <AiOutlineShareAlt
                          size={19}
                          className="cursor-pointer text-inherit"
                          onClick={() => setShareModal(!shareModal)}
                        />
                      </Tooltip>
                      {shareModal && (
                        <div className="absolute right-0 top-8 animate-slideIn">
                          <ShareSocial
                            title={questionDetails?.title}
                            url={shareLink}
                            socialTypes={[
                              'facebook',
                              'twitter',
                              'linkedin',
                              'whatsapp',
                            ]}
                            style={style}
                          />
                        </div>
                      )}
                    </div>
                    {!questionDetails.isBookmarked ? (
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
          </div>

          {/* question and answers section */}
          <div className="mt-12 flex w-full flex-col gap-8">
            <div className="w-full border-b-2 border-neutral-300 pb-7 ">
              <div
                className="flex flex-col gap-6 "
                dangerouslySetInnerHTML={{ __html: clean }}
              />
            </div>

            <div className="flex w-full flex-col gap-8 border-b-2 border-neutral-300 pb-7 ">
              <h3 className="font-medium text-secondary-600">
                Available Answers
              </h3>
              <div className="flex flex-col gap-8">
                {questionSuccess && answersSuccess && answers.length === 0 ? (
                  <div className="">
                    No answers for this question yet. Do the honours
                  </div>
                ) : (
                  questionSuccess &&
                  answersSuccess &&
                  answers?.map((answer) => (
                    <Answercard key={answer._id} answer={answer} />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Createanswer questionId={questionId} />
          </div>
        </div>
      )}
    </>
  );
}
