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

        {/* pagination */}
        <div className={communityStyle.pagination}>
          <button className={communityStyle.previousBtn}>
            Previous
          </button>
          <button className={communityStyle['pageBtn', 'active']}>1</button>
          <button className={communityStyle.pageBtn}>2</button>
          <button className={communityStyle.pageBtn}>3</button>
          <button className={communityStyle.nextBtn}>Next</button>
          <div className={communityStyle.pageCount}>
            <span className={communityStyle.currentPage}>1</span>
            <span className={communityStyle.divider}>/</span>
            <span className={communityStyle.totalPage}>60</span>
          </div>
        </div>
      </div>
    </div>
  )
}
