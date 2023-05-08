import { useState, useEffect } from 'react'

import questionPageStyles from './questionpage.module.css'

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

import gravatar from '../../../../../assets/general/gravatar.png'

import {
  ArrowCircleLeft,
  ArchiveAdd,
  ArrowUp,
  ArrowDown,
  Edit
} from 'iconsax-react'
import share from '../../../../../assets/icons/share.svg'

// import answercard
import Answercard from './answercard/answercard'

// import createanswer
import Createanswer from './createanswer/createanswer'

import { useGetQuestionByIdQuery } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useUpvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { useDownvoteQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

import ReactTimeAgo from 'react-time-ago'
import DOMPurify from 'isomorphic-dompurify'

export default function Questionpage () {
  const [questionId, setQuestionId] = useState()
  const [questionState, setQuestionState] = useState()
  const { question } = useParams()
  const navigate = useNavigate()

  const location = useLocation()

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
                    {questionState?.title}
                  </h3>
                  <div className={questionPageStyles.tags}>
                    <span className={questionPageStyles.tag}>UI/UX</span>
                    <span className={questionPageStyles.tag}>Design</span>
                  </div>
                </div>

                <div className={questionPageStyles.author}>
                  <div className={questionPageStyles.authorImg}>
                    <img src={gravatar} alt='' />
                  </div>
                  <div className={questionPageStyles.authorName}>
                    {questionState?.author.firstname}{' '}
                    {questionState?.author.lastname}
                  </div>
                </div>

                <div className={questionPageStyles.otherInfo}>
                  <div className={questionPageStyles.info}>
                    <span className={questionPageStyles.timePosted}>
                      <span className={questionPageStyles.requested}>
                        Request{' '}
                      </span>
                      {questionState &&
                        (questionSuccess ||
                          upvoteSuccess ||
                          downvoteSuccess) && (
                          <ReactTimeAgo
                            date={questionState?.createdAt}
                            locale='en-US'
                          />
                        )}
                    </span>
                    <span className={questionPageStyles.divider}></span>
                    <span className={questionPageStyles.answerCount}>
                      {questionState?.answer.length} Answers
                    </span>
                    <div
                      className={questionPageStyles.upvotes}
                      onClick={handleUpvoteQuestion}
                    >
                      <ArrowUp
                        size='19'
                        // className={questionPageStyles.icon}
                      />
                      {questionState?.upvotes}
                    </div>
                    <div
                      className={questionPageStyles.downvotes}
                      onClick={handleDownvoteQuestion}
                    >
                      <ArrowDown
                        size='19'
                        className={questionPageStyles.icon}
                      />
                      {questionState?.downvotes}
                    </div>
                  </div>
                  <div className={questionPageStyles.icons}>
                    <img
                      src={share}
                      alt=''
                      className={questionPageStyles.icon}
                    />
                    <ArchiveAdd size='20' className={questionPageStyles.icon} />
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
                {questionSuccess && questionState?.answer.length === 0 ? (
                  <div className={questionPageStyles.noAnswer}>
                    No answers for this question yet. Do the honours
                  </div>
                ) : (
                  questionSuccess &&
                  questionState?.answer.map(answer => (
                    <Answercard key={answer._id} answer={answer} />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className={questionPageStyles.createAnswer}>
            <Createanswer />
          </div>
        </div>
      )}
    </>
  )
}
