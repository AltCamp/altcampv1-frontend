import communityStyle from './community.module.css'

import Questioncard from './questioncard/questioncard';

{/* <ArrowDown size="32" color="#FF8A65"/> */}



export default function Community () {
  return (
    <div className={communityStyle.container}>
      <div className={communityStyle.sectionOne}>
        <div className={communityStyle.header}>
          <div className={communityStyle.title}>
            <h1 className={communityStyle.h1}>Community</h1>
            <p className={communityStyle.p}>
              Share what you know even and also ask about what you do not know
            </p>
          </div>
          <button className={communityStyle.questionCta}>Ask Question</button>
        </div>

        <div className={communityStyle.questions}>
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
          <Questioncard />
        </div>
      </div>
    </div>
  )
}
