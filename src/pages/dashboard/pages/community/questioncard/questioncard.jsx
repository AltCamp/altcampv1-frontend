import questionCardStyles from './questioncard.module.css'
import { ArrowDown, ArrowUp, ArchiveAdd, Edit } from 'iconsax-react'

import gravatar from '../../../../../assets/general/gravatar.png'

export default function Questioncard () {
  return (
    <div className={questionCardStyles.container}>
      <div className={questionCardStyles.header}>
        <h3 className={questionCardStyles.title}>
          What is the difference between Product design and Ui/Ux?
        </h3>
        <div className={questionCardStyles.tags}>
          <span className={questionCardStyles.tag}>UI/UX</span>
          <span className={questionCardStyles.tag}>Design</span>
        </div>
      </div>

      <div className={questionCardStyles.body}>
        <div className={questionCardStyles.otherInfo}>
          <div className={questionCardStyles.info}>
            <span className={questionCardStyles.answerCount}>5 answers</span>
            <span className={questionCardStyles.divider}>|</span>
            <span className={questionCardStyles.timePosted}>
              Last Request 12hrs ago
            </span>
          </div>

          <div className={questionCardStyles.votes}>
            <div className={questionCardStyles.upvotes}>
              <ArrowUp size='19' className={questionCardStyles.icon} />
              15
            </div>
            <div className={questionCardStyles.downvotes}>
              <ArrowDown size='19' className={questionCardStyles.icon} />5
            </div>
            <div className={questionCardStyles.bookmark}>
              <ArchiveAdd size='19' className={questionCardStyles.icon} />
            </div>
          </div>
        </div>

        <div className={questionCardStyles.authorAnswerLink}>
          <div className={questionCardStyles.author}>
            <div className={questionCardStyles.authorImg}>
              <img src={gravatar} alt='' />
            </div>
            <div className={questionCardStyles.authorName}>Seun Akin</div>
          </div>
          <span className={questionCardStyles.authorDivider}>|</span>
          <div className={questionCardStyles.answerBtn}>
            <Edit size='17' className={questionCardStyles.editIcon} />
            Answer
          </div>
        </div>
      </div>
    </div>
  )
}
