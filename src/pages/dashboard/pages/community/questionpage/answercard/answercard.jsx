import { useState, useEffect } from 'react'

import answerCardStyles from './answercard.module.css'

import { Link } from 'react-router-dom'

import { ArrowDown, ArrowUp, ArchiveAdd, Edit } from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'
import DOMPurify from 'isomorphic-dompurify'
import { Tooltip } from 'react-tooltip'

import {
  useUpvoteAnswerMutation,
  useDownvoteAnswerMutation,
  useUpdateAnswerMutation
} from '../../../../../../app/slices/apiSlices/communitySlice'

import { useSelector } from 'react-redux'
import RichEditor from '../../richeditor/richeditor'

import BookmarkModal from './../../../../components/bookmarkmodal/bookmarkmodal'

// import prsims modules for code highlighting and sytyling
// import Prism from 'prismjs'

export default function Answercard ({ answer }) {
  const [content, setContent] = useState(answer?.content)
  const [editMode, setEditMode] = useState(false)
  const [toggleBookmarkModal, setToggleBookmarkModal] = useState()

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
      body: {
        content: `Edited: ${content}`
      }
    })
  }

  useEffect(() => {
    if (updateAnswerSuccess) {
      setEditMode(false)
    }
  }, [updateAnswerSuccess])

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal)
  }

  return (
    <>
      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={answer._id}
          postType={`Answer`}
          postTitle={answer?.content}
        />
      )}
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
              <Link
                to={
                  user?._id === answer?.author?._id
                    ? '/dashboard/account'
                    : `/dashboard/users/${answer?.author?._id}`
                }
                className={answerCardStyles.name}
              >
                {answer?.author?.firstName} {answer?.author?.lastName}{' '}
                {answer?.author?.accountType == 'Mentor' && (
                  <span className={answerCardStyles.mentor}>Instructor</span>
                )}
              </Link>
              <span className={answerCardStyles.divider}></span>
              <span className={answerCardStyles.timeAnswered}>
                <ReactTimeAgo date={answer?.createdAt} locale='en-US' />
              </span>
            </div>
            <div className={answerCardStyles.content}>
              <div
                className={answerCardStyles.body}
                dangerouslySetInnerHTML={{ __html: answer?.content }}
              />
            </div>

            <div className={answerCardStyles.votes}>
              <div
                className={answerCardStyles.upvotes}
                style={{
                  color: answer?.upvotes > 0 ? '#0e8a1a' : '#343a40'
                }}
              >
                <Tooltip id='my-tooltip' />
                <ArrowUp
                  size='19'
                  className={answerCardStyles.icon}
                  onClick={handleUpvoteAnswer}
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='upvote'
                  data-tooltip-place='top'
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
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content='downvote'
                  data-tooltip-place='top'
                />
                {answer?.downvotes}
              </div>
              <div className={answerCardStyles.bookmark}>
                <ArchiveAdd
                  size='19'
                  className={answerCardStyles.icon}
                  onClick={handleToggleBookmarkModal}
                />
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
    </>
  )
}
