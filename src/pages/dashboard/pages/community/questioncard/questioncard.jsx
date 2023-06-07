import { Link } from 'react-router-dom'

import questionCardStyles from './questioncard.module.css'
import {
  ArrowDown,
  ArrowUp,
  ArchiveAdd,
  Edit,
  ProfileCircle
} from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'

export default function Questioncard ({ question }) {
  // console.log(question)
  return (
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
              <ArchiveAdd size='19' className={questionCardStyles.icon} />
            </div>
          </div>
        </div>

        <div className={questionCardStyles.authorAnswerLink}>
          <div className={questionCardStyles.author}>
            <div className={questionCardStyles.authorImg}>
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
            </div>
            <Link
              to={`/dashboard/users/${question?.author._id}`}
              className={questionCardStyles.authorName}
            >
              {question.author.firstName} {question.author.lastName}
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
  )
}
