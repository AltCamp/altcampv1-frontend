import { useState, useEffect } from 'react'

import questionPageStyles from './questionpage.module.css'

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

import gravatar from '../../../../../assets/general/gravatar.png'

import {
  ArrowCircleLeft,
  ArchiveAdd,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash
} from 'iconsax-react'
import share from '../../../../../assets/icons/share.svg'

// import answercard
import Answercard from './answercard/answercard'

// import createanswer
import Createanswer from './createanswer/createanswer'

import { useGetQuestionByIdQuery } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useUpvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useDownvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useGetAnswersQuery } from '../../../../../app/slices/apiSlices/communitySlices/answerSlice'

import ReactTimeAgo from 'react-time-ago'
import DOMPurify from 'isomorphic-dompurify'

import { useSelector } from 'react-redux'

export default function Questionpage () {
  const [questionId, setQuestionId] = useState()
  const [questionState, setQuestionState] = useState()
  const { question } = useParams()
  const navigate = useNavigate()

  const location = useLocation()

  const { user } = useSelector(state => state?.user.user)

  // console.log(user)

  useEffect(() => {
    if (location.state) {
      setQuestionId(location.state.question)
    }
  }, [location])

  const {
    data: questionData,
    isLoading: questionLoading,
    isSuccess: questionSuccess,
    isError: questionIsError,
    error: questionError
  } = useGetQuestionByIdQuery(questionId)

  const questionDetails = questionData?.data

  // console.log(questionDetails)

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

  useEffect(() => {
    if (upvoteSuccess) {
      setQuestionState(upvoteData?.data)
    } else if (downvoteSuccess) {
      setQuestionState(downvoteData?.data)
    } else if (questionSuccess) {
      setQuestionState(questionDetails)
    }
  }, [upvoteSuccess, downvoteSuccess, questionSuccess])

  // logic for getting answers
  const { data: answersData, isSuccess: answersSuccess } =
    useGetAnswersQuery(questionId)

  const answers = answersData?.data
  // console.log(questionState)

  return (
    <>
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
                    {questionDetails?.title}
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
                    <div className={questionPageStyles.authorName}>
                      {questionDetails?.author.firstname}{' '}
                      {questionDetails?.author.lastname}
                    </div>
                  </div>

                  {user?._id === questionDetails?.author._id && (
                    <div className={questionPageStyles.edit}>
                      <Edit size='19' />
                      <p className={questionPageStyles.editText}>
                        Edit Question
                      </p>
                    </div>
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
                      <ArrowUp
                        size='19'
                        // className={questionPageStyles.icon}
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
                      />
                      {questionDetails?.downvotes}
                    </div>
                  </div>
                  <div className={questionPageStyles.icons}>
                    {user?._id === questionDetails?.author._id && (
                      <Trash size='20' className={questionPageStyles.icon} />
                    )}
                    <img
                      src={share}
                      alt=''
                      className={questionPageStyles.icon}
                      style={{
                        color: '#212529',
                        width: '1rem'
                      }}
                    />
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
