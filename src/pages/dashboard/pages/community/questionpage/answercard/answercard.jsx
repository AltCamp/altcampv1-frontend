import answerCardStyles from './answercard.module.css'

import { ArrowDown, ArrowUp, ArchiveAdd, Edit } from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'
import DOMPurify from 'isomorphic-dompurify'

import {
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation
} from '../../../../../../app/slices/apiSlices/communitySlices/answerSlice'

import { useSelector } from 'react-redux'

export default function Answercard ({ answer }) {
  const clean = DOMPurify.sanitize(answer?.content, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
  })

  const { user } = useSelector(state => state?.user.user)

  const answerId = answer?._id

  const [upvoteAnswer, { data, isSuccess, isLoading, isError, error }] =
    useUpvoteAnswerMutation()

  const [
    downvoteAnswer,
    {
      data: downvoteData,
      isSuccess: downvoteSuccess,
      isLoading: downvoteLoading,
      isError: downvoteIsError,
      error: downvoteError
    }
  ] = useDownvoteAnswerMutation()

  const handleUpvoteAnswer = () => {
    upvoteAnswer(answerId)
  }

  const handleDownvoteAnswer = () => {
    downvoteAnswer(answerId)
  }


  return (
    <div className={answerCardStyles.container}>
      <div className={answerCardStyles.header}>
        <span className={answerCardStyles.name}>
          {answer?.author?.firstname} {answer?.author?.lastname}{' '}
          {answer?.author?.accountType == 'Mentor' && (
            <span className={answerCardStyles.mentor}>Instructor</span>
          )}
        </span>
        <span className={answerCardStyles.divider}></span>
        <span className={answerCardStyles.timeAnswered}>
          <ReactTimeAgo date={answer?.createdAt} locale='en-US' />
        </span>
      </div>
      <div className={answerCardStyles.content}>
        <div
          className={answerCardStyles.body}
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </div>

      <div className={answerCardStyles.votes}>
        <div
          className={answerCardStyles.upvotes}
          style={{
            color: answer?.upvotes > 0 ? '#0e8a1a' : '#343a40'
          }}
        >
          <ArrowUp
            size='19'
            className={answerCardStyles.icon}
            onClick={handleUpvoteAnswer}
          />
          {answer?.upvotes}
        </div>
        <div
          className={answerCardStyles.downvotes}
          style={{
            color: answer?.downvotes > 0 ? '#dc3545' : '#343a40'
          }}
        >
          <ArrowDown
            size='19'
            className={answerCardStyles.icon}
            onClick={handleDownvoteAnswer}
          />
          {answer?.downvotes}
        </div>
        <div className={answerCardStyles.bookmark}>
          <ArchiveAdd size='19' className={answerCardStyles.icon} />
        </div>
        {user?._id === answer?.author?._id && (
          <div className={answerCardStyles.edit}>
            <Edit size='19' className={answerCardStyles.icon} />
          </div>
        )}
      </div>
    </div>
  )
}
