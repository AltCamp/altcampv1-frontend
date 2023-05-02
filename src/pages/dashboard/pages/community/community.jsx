import { useEffect } from 'react'

import communityStyle from './community.module.css'

import Questioncard from './questioncard/questioncard'

import { Link } from 'react-router-dom'

import { useGetAllQuestionsQuery } from '../../../../app/slices/apiSlices/communitySlices/questionSlice'

export default function Community () {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllQuestionsQuery()

  const questions = data?.data

  // console.log(questions)

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('data:', questions)
  //   }
  //   if (isError) {
  //     console.log('error:', error)
  //   }
  // }, [data, isLoading, isSuccess, isError, error])

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
          <Link
            to={'/dashboard/community/ask/:question'}
            className={communityStyle.questionCta}
          >
            Ask Question
          </Link>
        </div>

        <div className={communityStyle.questions}>
          {isLoading && (
            <div className={communityStyle.loading}>
              <div className={communityStyle.loader}></div>
            </div>
          )}
          {questions?.map(question => (
            <Questioncard key={question._id} question={question} />
          ))}
        </div>

        {/* pagination */}
        {isSuccess && (
          <div className={communityStyle.pagination}>
            <button className={communityStyle.previousBtn}>Previous</button>
            <button className={communityStyle[('pageBtn', 'active')]}>1</button>
            <button className={communityStyle.pageBtn}>2</button>
            <button className={communityStyle.pageBtn}>3</button>
            <button className={communityStyle.nextBtn}>Next</button>
            <div className={communityStyle.pageCount}>
              <span className={communityStyle.currentPage}>1</span>
              <span className={communityStyle.divider}>/</span>
              <span className={communityStyle.totalPage}>60</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
