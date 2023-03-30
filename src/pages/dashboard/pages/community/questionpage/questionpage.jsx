import questionPageStyles from './questionpage.module.css'

import { useParams, useNavigate } from 'react-router-dom'

import { ArrowCircleLeft, ArchiveAdd } from 'iconsax-react'
import share from '../../../../../assets/icons/share.svg'

import questionImg from '../../../../../assets/general/questionImage.webp'

// import answercard
import Answercard from './answercard/answercard'

// import createanswer
import Createanswer from './createanswer/createanswer'

export default function Questionpage () {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className={questionPageStyles.container}>
      <div className={questionPageStyles.header}>
        <div className={questionPageStyles.back} onClick={() => navigate(-1)}>
          <ArrowCircleLeft size='23' className={questionPageStyles.backIcon} />
          <div className={questionPageStyles.backText}>Back to community</div>
        </div>
        <div className={questionPageStyles.headerGroup}>
          <div className={questionPageStyles.titleGroup}>
            <div className={questionPageStyles.titleHeader}>
              <h3 className={questionPageStyles.title}>
                What is the difference between Product design and Ui/Ux?
              </h3>
              <div className={questionPageStyles.tags}>
                <span className={questionPageStyles.tag}>UI/UX</span>
                <span className={questionPageStyles.tag}>Design</span>
              </div>
            </div>

            <div className={questionPageStyles.otherInfo}>
              <div className={questionPageStyles.info}>
                <span className={questionPageStyles.timePosted}>
                  Request 12hrs ago
                </span>
                <span className={questionPageStyles.divider}></span>
                <span className={questionPageStyles.answerCount}>
                  5 answers
                </span>
              </div>
              <div className={questionPageStyles.icons}>
                <img src={share} alt='' className={questionPageStyles.icon} />
                <ArchiveAdd size='20' className={questionPageStyles.icon} />
              </div>
            </div>
          </div>
          <button className={questionPageStyles.questionCta}>
            Ask Question
          </button>
        </div>
      </div>

      {/* question and answers section */}
      <div className={questionPageStyles.body}>
        <div className={questionPageStyles.questionGroup}>
          <div className={questionPageStyles.question}>
            <p className={questionPageStyles.p}>
              Lorem ipsum dolor sit amet consectetur. Laoreet pellentesque
              maecenas fermentum vel iaculis diam. Lectus bibendum augue auctor
              justo lacus orci congue. Enim volutpat odio massa lorem faucibus
              sed bibendum. Et molestie tellus tellus interdum sed tellus
              praesent. Justo mollis nulla interdum euismod id porttitor.
              Venenatis volutpat ac felis fames bibendum sapien pretium ac eget.
            </p>
            <img
              src={questionImg}
              alt=''
              className={questionPageStyles.questionImg}
            />
            <p className={questionPageStyles.p}>
              Lorem ipsum dolor sit amet consectetur. Laoreet pellentesque
              maecenas fermentum vel iaculis diam. Lectus bibendum augue auctor
              justo lacus orci congue. Enim volutpat odio massa lorem faucibus
              sed bibendum. Et molestie tellus tellus interdum sed tellus
              praesent. Justo mollis nulla interdum euismod id porttitor.
              Venenatis volutpat ac felis fames bibendum sapien pretium ac eget.
            </p>
            <img
              src={questionImg}
              alt=''
              className={questionPageStyles.questionImg}
            />
          </div>
        </div>

        <div className={questionPageStyles.answers}>
          <h3 className={questionPageStyles.answerHeader}>Available Answers</h3>
          <div className={questionPageStyles.answerCards}>
            <Answercard />
            <Answercard />
          </div>
        </div>
      </div>

      <div className={questionPageStyles.createAnswer}>
        <Createanswer />
      </div>
    </div>
  )
}
