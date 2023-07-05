import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import questionCardStyles from './questioncard.module.css'
import {
  ArrowDown,
  ArrowUp,
  ArchiveAdd,
  Edit,
  ProfileCircle
} from 'iconsax-react'

import { BsFillBookmarkFill, BsBookmarkPlus } from 'react-icons/bs'

import ReactTimeAgo from 'react-time-ago'

import { useSelector } from 'react-redux'

import BookmarkModal from '../../../components/bookmarkmodal/bookmarkmodal'

import { useDeleteBookmarkMutation } from '../../../../../app/slices/apiSlices/bookmarkSlice'

export default function Questioncard ({ question }) {
  // console.log(bookmarkState)

  const [toggleBookmarkModal, setToggleBookmarkModal] = useState()
  const { user } = useSelector(state => state?.user?.user)

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal)
  }

  const [deleteBookmark, { isSuccess, isLoading, isError, error }] =
    useDeleteBookmarkMutation()

  return (
    <>
      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={question._id}
          postType={`Question`}
          postTitle={question.title}
        />
      )}
      <div className={questionCardStyles.container}>
        <div className={questionCardStyles.header}>
          <Link
            to={`/dashboard/community/question/${question._id}/${question.slug}`}
            // state={{ question: question._id }}
          >
            <h3 className={questionCardStyles.title}>{question.title}</h3>
          </Link>
          <div className={questionCardStyles.tags}>
            <span className={questionCardStyles.tag}>UI/UX</span>
            <span className={questionCardStyles.tag}>Design</span>
          </div>
        </div>

        <div className={questionCardStyles.body}>
          <div className={questionCardStyles.otherInfo}>
            <div className={questionCardStyles.info}>
              <span className={questionCardStyles.answerCount}>
                {question.answer.length}
                {question.answer.length > 1 ? ' Answers' : ' Answer'}
              </span>
              <span className={questionCardStyles.divider}>|</span>
              <span className={questionCardStyles.timePosted}>
                <span className={questionCardStyles.requested}>Requested </span>
                {<ReactTimeAgo date={question.createdAt} locale='en-US' />}
              </span>
            </div>

            <div className={questionCardStyles.votes}>
              <div
                className={questionCardStyles.upvotes}
                style={{
                  color: question?.upvotes > 0 ? '#0e8a1a' : '#343a40'
                }}
              >
                <ArrowUp size='19' className={questionCardStyles.icon} />
                {question.upvotes}
              </div>
              <div
                className={questionCardStyles.downvotes}
                style={{
                  color: question?.downvotes > 0 ? '#dc3545' : '#343a40'
                }}
              >
                <ArrowDown size='19' className={questionCardStyles.icon} />
                {question.downvotes}
              </div>
              <div className={questionCardStyles.bookmark}>
                {/* <BsFillBookmarkFill
                  size='19'
                  className={questionCardStyles.icon}
                  onClick={handleDeleteBookmark}
                /> */}
                <BsBookmarkPlus
                  size='19'
                  className={questionCardStyles.icon}
                  onClick={handleToggleBookmarkModal}
                />
              </div>
            </div>
          </div>

          <div className={questionCardStyles.authorAnswerLink}>
            <div className={questionCardStyles.author}>
              <Link
                to={
                  user?._id === question?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${question?.author?._id}`
                }
                className={questionCardStyles.authorImg}
              >
                {question?.author?.profilePicture ? (
                  <img
                    src={question?.author?.profilePicture}
                    alt=''
                    className={questionCardStyles.img}
                  />
                ) : (
                  <ProfileCircle
                    color='#555555'
                    className={questionCardStyles.img}
                  />
                )}
              </Link>
              <Link
                to={
                  user?._id === question?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${question?.author?._id}`
                }
                className={questionCardStyles.authorName}
              >
                {question.author?.firstName} {question.author?.lastName}
              </Link>
            </div>
            <span className={questionCardStyles.authorDivider}>|</span>
            <Link
              to={`/dashboard/community/question/${question._id}/${question.slug}`}
              // state={{ question: question._id }}
              className={questionCardStyles.answerBtn}
            >
              <Edit size='17' className={questionCardStyles.editIcon} />
              Answer
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
