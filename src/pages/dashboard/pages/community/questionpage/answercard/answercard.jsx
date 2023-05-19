import { useState, useEffect } from 'react'

import answerCardStyles from './answercard.module.css'

import { ArrowDown, ArrowUp, ArchiveAdd, Edit } from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'
import DOMPurify from 'isomorphic-dompurify'

import {
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
  useUpdateAnswerMutation
} from '../../../../../../app/slices/apiSlices/communitySlices/answerSlice'

import { useSelector } from 'react-redux'
import RichEditor from '../../richeditor/richeditor'

export default function Answercard ({ answer }) {
  const [content, setContent] = useState(answer?.content)
  const [editMode, setEditMode] = useState(false)
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

  const [
    updateAnswer,
    {
      data: updateAnswerData,
      isSuccess: updateAnswerSuccess,
      isLoading: updateAnswerLoading,
      isError: updateAnswerIsError,
      error: updateAnswerError
    }
  ] = useUpdateAnswerMutation()

  const handleUpvoteAnswer = () => {
    upvoteAnswer(answerId)
  }

  const handleDownvoteAnswer = () => {
    downvoteAnswer(answerId)
  }

  const handleUpdateAnswer = () => {
    updateAnswer({
      answerId,
      body: content
    })
  }

  useEffect(() => {
    if (updateAnswerSuccess) {
      setEditMode(false)
    }
  }, [updateAnswerSuccess])

  // console.log(content)
  return (
    <div className={answerCardStyles.container}>
      {editMode ? (
        <div className={answerCardStyles.editContainer}>
          <RichEditor setBody={setContent} body={content} />
          <div className={answerCardStyles.editButtons}>
            <button
              className={answerCardStyles.cancelButton}
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              className={answerCardStyles.updateButton}
              onClick={handleUpdateAnswer}
              disabled={updateAnswerLoading}
              style={{
                cursor: updateAnswerLoading ? 'not-allowed' : 'pointer',
                opacity: updateAnswerLoading ? '0.7' : '1'
              }}
            >
              {updateAnswerLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      ) : (
        <>
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
              <div
                className={answerCardStyles.edit}
                onClick={() => setEditMode(!editMode)}
              >
                <Edit size='19' className={answerCardStyles.icon} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
