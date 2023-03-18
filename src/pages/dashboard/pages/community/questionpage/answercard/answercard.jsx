import answerCardStyles from './answercard.module.css'

import { ArrowDown, ArrowUp, ArchiveAdd } from 'iconsax-react'

export default function Answercard () {
  return (
    <div className={answerCardStyles.container}>
      <div className={answerCardStyles.header}>
        <span className={answerCardStyles.name}>Ango Mustee</span>
        <span className={answerCardStyles.divider}></span>
        <span className={answerCardStyles.timeAnswered}>
          Answered 12hrs ago
        </span>
      </div>
      <div className={answerCardStyles.content}>
        Lorem ipsum dolor sit amet consectetur. Laoreet pellentesque maecenas
        fermentum vel iaculis diam. Lectus bibendum augue auctor justo lacus
        orci congue. Enim volutpat odio massa lorem faucibus sed bibendum. Et
        molestie tellus tellus interdum sed tellus praesent. Justo mollis nulla
        interdum euismod id porttitor. Venenatis volutpat ac felis fames
        bibendum sapien pretium ac eget.
      </div>

      <div className={answerCardStyles.votes}>
        <div className={answerCardStyles.upvotes}>
          <ArrowUp size='19' className={answerCardStyles.icon} />
          15
        </div>
        <div className={answerCardStyles.downvotes}>
          <ArrowDown size='19' className={answerCardStyles.icon} />5
        </div>
        <div className={answerCardStyles.bookmark}>
          <ArchiveAdd size='19' className={answerCardStyles.icon} />
        </div>
      </div>
    </div>
  )
}
