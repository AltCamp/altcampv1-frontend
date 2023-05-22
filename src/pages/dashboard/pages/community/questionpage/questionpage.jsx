import { useState, useEffect } from 'react'

import questionPageStyles from './questionpage.module.css'

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

import gravatar from '../../../../../assets/general/gravatar.png'
import caution from '../../../../../assets/general/deletecaution.svg'

import {
  ArrowCircleLeft,
  ArchiveAdd,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash,
  CloseCircle
} from 'iconsax-react'

import share from '../../../../../assets/icons/share.svg'

import { Helmet } from 'react-helmet-async'
import { ShareSocial } from 'react-share-social'
import { Tooltip } from 'react-tooltip'

// import answercard
import Answercard from './answercard/answercard'

// import createanswer
import Createanswer from './createanswer/createanswer'

import { useGetQuestionByIdQuery } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useUpvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useDownvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useGetAnswersQuery } from '../../../../../app/slices/apiSlices/communitySlices/answerSlice'

import { useDeleteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import ReactTimeAgo from 'react-time-ago'
import DOMPurify from 'isomorphic-dompurify'

import { useSelector } from 'react-redux'

export default function Questionpage () {
  // const [questionId, setQuestionId] = useState()
  const [deleteQuestionModal, setDeleteQuestionModal] = useState(false)
  const [shareModal, setShareModal] = useState(false)
  const [screenWidthState, setScreenWidthState] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()
  const { questionId } = useParams()

  // get currnet page address
  const shareLink = window.location.href

  const { user } = useSelector(state => state?.user.user)

  // console.log(user)

  // useEffect(() => {
  //   if (location.state) {
  //     setQuestionId(location.state.question)
  //   }
  // }, [location])

  const {
    data: questionData,
    isLoading: questionLoading,
    isSuccess: questionSuccess,
    isError: questionIsError,
    error: questionError
  } = useGetQuestionByIdQuery(questionId)

  const questionDetails = questionData?.data

  // console.log(questionId)

  const clean = DOMPurify.sanitize(questionDetails?.body, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  })

  const [
    upvoteQuestion,
    {
      data: upvoteData,
      isLoading: upvoteLoading,
      isSuccess: upvoteSuccess,
      isError: upvoteIsError,
      error: upvoteError
    }
  ] = useUpvoteQuestionMutation()

  const [
    downvoteQuestion,
    {
      data: downvoteData,
      isLoading: downvoteLoading,
      isSuccess: downvoteSuccess,
      isError: downvoteIsError,
      error: downvoteError
    }
  ] = useDownvoteQuestionMutation()

  const handleUpvoteQuestion = () => {
    upvoteQuestion(questionId)
  }

  const handleDownvoteQuestion = () => {
    downvoteQuestion(questionId)
  }

  // logic for getting answers
  const { data: answersData, isSuccess: answersSuccess } =
    useGetAnswersQuery(questionId)

  const answers = answersData?.data
  // console.log(answers)

  const [
    deleteQuestion,
    {
      data: deleteQuestionData,
      isLoading: deleteQuestionLoading,
      isSuccess: deleteQuestionSuccess,
      isError: deleteQuestionError,
      error: deleteQuestionErrors
    }
  ] = useDeleteQuestionMutation()

  const handleDeleteQuestion = () => {
    deleteQuestion(questionId)
  }

  useEffect(() => {
    if (deleteQuestionSuccess) {
      navigate('/dashboard/community', { state: { deleted: true } })
    }
  }, [deleteQuestionSuccess])

  const handleDeleteModal = () => {
    setDeleteQuestionModal(!deleteQuestionModal)
  }

  useEffect(() => {
    if (deleteQuestionModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [deleteQuestionModal])

  useEffect(() => {
    const media = window.innerWidth
    window.addEventListener('resize', () => {
      setScreenWidthState(media < 500)
    })
  }, [])

  // console.log(screenWidthState)

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
      fontFamily: 'Inter'
    },
    copyContainer: {
      border: '1px solid blue',
      background: 'rgb(0,0,0,0.7)'
    },
    title: {
      color: 'aquamarine',
      fontStyle: 'italic'
    }
  }

  return (
    <>
      <Helmet>
        <title>
          {questionDetails?.title ? questionDetails?.title : 'Community'}
        </title>
        <meta name='description' content={`${questionDetails?.body}`} />
        <link rel='canonical' href={`/question/${questionDetails?.slug}`} />
      </Helmet>
      {deleteQuestionModal && (
        <div className={questionPageStyles.deleteWarningOverlay}>
          <div className={questionPageStyles.deleteWarning}>
            <CloseCircle
              size='20'
              className={questionPageStyles.closeIcon}
              onClick={handleDeleteModal}
            />
            <div className={questionPageStyles.warningIcon}>
              <img src={caution} alt='' className={questionPageStyles.check} />
            </div>
            <p className={questionPageStyles.warningText}>
              You are about to delete this question. Do you want to proceed?
            </p>
            <div className={questionPageStyles.warningBtnGroup}>
              <button
                className={questionPageStyles.cancelBtn}
                onClick={handleDeleteModal}
              >
                Cancel
              </button>
              <button
                className={questionPageStyles.confirmBtn}
                onClick={handleDeleteQuestion}
                disabled={deleteQuestionLoading}
                style={{
                  backgroundColor: deleteQuestionLoading ? '#ccc' : '#FF5B5B',
                  cursor: deleteQuestionLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {deleteQuestionLoading ? 'Deleting...' : 'Proceed'}
              </button>
            </div>
          </div>
        </div>
      )}
      {questionLoading && (
        <div className={questionPageStyles.container}>
          <div className={questionPageStyles.loading}>
            <div className={questionPageStyles.loader}></div>
          </div>
        </div>
      )}
      {questionSuccess && (
        <div className={questionPageStyles.container}>
          <div className={questionPageStyles.header}>
            <div
              className={questionPageStyles.back}
              onClick={() => navigate(-1)}
            >
              <ArrowCircleLeft
                size='23'
                className={questionPageStyles.backIcon}
              />
              <div className={questionPageStyles.backText}>
                Back to community
              </div>
            </div>
            <div className={questionPageStyles.headerGroup}>
              <div className={questionPageStyles.titleGroup}>
                <div className={questionPageStyles.titleHeader}>
                  <h3 className={questionPageStyles.title}>
                    {/* if question has been edited, show edited title */}
                    {questionDetails?.createdAt !== questionDetails?.updatedAt
                      ? `Edited: ${questionDetails?.title}`
                      : questionDetails?.title}
                  </h3>
                  <div className={questionPageStyles.tags}>
                    <span className={questionPageStyles.tag}>UI/UX</span>
                    <span className={questionPageStyles.tag}>Design</span>
                  </div>
                </div>

                <div className={questionPageStyles.userLinks}>
                  <div className={questionPageStyles.author}>
                    <div className={questionPageStyles.authorImg}>
                      <img src={gravatar} alt='' />
                    </div>
                    <Link
                      to={`/dashboard/users/${questionDetails?.author._id}`}
                      className={questionPageStyles.authorName}
                    >
                      {questionDetails?.author.firstName}{' '}
                      {questionDetails?.author.lastName}
                    </Link>
                  </div>

                  {user?._id === questionDetails?.author._id && (
                    <Link
                      to={`/dashboard/community/editquestion`}
                      state={{
                        question: questionDetails?._id,
                        title: questionDetails?.title,
                        body: questionDetails?.body
                      }}
                      className={questionPageStyles.edit}
                    >
                      <Edit size='19' />
                      <p className={questionPageStyles.editText}>
                        Edit Question
                      </p>
                    </Link>
                  )}
                </div>

                <div className={questionPageStyles.otherInfo}>
                  <div className={questionPageStyles.info}>
                    <span className={questionPageStyles.timePosted}>
                      <span className={questionPageStyles.requested}>
                        Requested{' '}
                      </span>
                      {questionDetails &&
                        (questionSuccess ||
                          upvoteSuccess ||
                          downvoteSuccess) && (
                          <ReactTimeAgo
                            date={questionDetails?.createdAt}
                            locale='en-US'
                          />
                        )}
                    </span>
                    <span className={questionPageStyles.divider}></span>
                    <span className={questionPageStyles.answerCount}>
                      {questionDetails?.answer.length}
                      {questionDetails?.answer.length > 1
                        ? ' Answers'
                        : ' Answer'}
                    </span>
                    <div
                      className={questionPageStyles.upvotes}
                      onClick={handleUpvoteQuestion}
                      style={{
                        color:
                          questionDetails?.upvotes > 0 ? '#0e8a1a' : '#343a40'
                      }}
                    >
                      <Tooltip
                        id='my-tooltip'
                        style={{
                          backgroundColor: '#fff',
                          color: '#000',
                          borderRadius: '4px',
                          padding: '2px'
                        }}
                      />
                      <ArrowUp
                        size='19'
                        // className={questionPageStyles.icon}
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content='upvote'
                        data-tooltip-place='top'
                      />
                      {questionDetails?.upvotes}
                    </div>
                    <div
                      className={questionPageStyles.downvotes}
                      onClick={handleDownvoteQuestion}
                      style={{
                        color:
                          questionDetails?.downvotes > 0 ? '#dc3545' : '#343a40'
                      }}
                    >
                      <ArrowDown
                        size='19'
                        className={questionPageStyles.icon}
                        data-tooltip-id='my-tooltip'
                        data-tooltip-content='downvote'
                        data-tooltip-place='top'
                      />
                      {questionDetails?.downvotes}
                    </div>
                  </div>
                  <div className={questionPageStyles.icons}>
                    {user?._id === questionDetails?.author._id && (
                      <Trash
                        size='20'
                        className={questionPageStyles.icon}
                        onClick={handleDeleteModal}
                      />
                    )}
                    <div className={questionPageStyles.share}>
                      <img
                        src={share}
                        alt=''
                        className={questionPageStyles.icon}
                        style={{
                          color: '#212529',
                          width: '1rem'
                        }}
                        onClick={() => setShareModal(!shareModal)}
                      />
                      {shareModal && (
                        <div className={questionPageStyles.shareModal}>
                          <ShareSocial
                            title={questionDetails?.title}
                            url={shareLink}
                            socialTypes={[
                              'facebook',
                              'twitter',
                              'reddit',
                              'linkedin',
                              'whatsapp',
                              'email',
                              'telegram'
                            ]}
                            style={style}
                          />
                        </div>
                      )}
                    </div>
                    <ArchiveAdd
                      size='20'
                      className={questionPageStyles.icon}
                      color='#212529'
                    />
                  </div>
                </div>
              </div>
              <Link
                to={'/dashboard/community/ask/:question'}
                className={questionPageStyles.questionCta}
              >
                Ask Question
              </Link>
            </div>
          </div>

          {/* question and answers section */}
          <div className={questionPageStyles.body}>
            <div className={questionPageStyles.questionGroup}>
              <div
                className={questionPageStyles.question}
                dangerouslySetInnerHTML={{ __html: clean }}
              />
            </div>

            <div className={questionPageStyles.answers}>
              <h3 className={questionPageStyles.answerHeader}>
                Available Answers
              </h3>
              <div className={questionPageStyles.answerCards}>
                {questionSuccess && answersSuccess && answers.length === 0 ? (
                  <div className={questionPageStyles.noAnswer}>
                    No answers for this question yet. Do the honours
                  </div>
                ) : (
                  questionSuccess &&
                  answersSuccess &&
                  answers?.map(answer => (
                    <Answercard key={answer._id} answer={answer} />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className={questionPageStyles.createAnswer}>
            <Createanswer questionId={questionId} />
          </div>
        </div>
      )}
    </>
  )
}
