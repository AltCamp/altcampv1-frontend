import { useEffect, useState } from 'react'

import communityStyle from './community.module.css'

import Questioncard from './questioncard/questioncard'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useGetAllQuestionsQuery } from '../../../../app/slices/apiSlices/communitySlices/questionSlice'

import { CloseCircle } from 'iconsax-react'

import greenCheck from '../../../../assets/general/greencreatepostcheck.svg'

import { Helmet } from 'react-helmet-async'

export default function Community () {
  const [sortedQuestions, setSortedQuestions] = useState()
  const [createDeleteModal, setCreateDeleteModal] = useState(false)

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllQuestionsQuery()

  const questions = data?.data

  const navigate = useNavigate()

  const location = useLocation()
 

  // check location state for new post created and clear it after handleNewPostCreated is called

  useEffect(() => {
    if (location.state) {
      if (location.state.created || location.state.deleted) {
        setCreateDeleteModal(true)
      } else {
        setCreateDeleteModal(false)
      }
    }
  }, [location])

  const handleCreateDeleteModal = () => {
    setCreateDeleteModal(!createDeleteModal)
    // reload the page
    // window.location.reload()
    navigate(location.pathname, { state: {} })
  }

  // sort the questions by most recntly added
  useEffect(() => {
    if (questions) {
      // create a copy of the questions array
      const copyQuestions = [...questions]
      const theQuestions = copyQuestions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setSortedQuestions(theQuestions)
    }
  }, [questions])

  useEffect(() => {
    if (createDeleteModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [createDeleteModal])

  return (
    <div className={communityStyle.container}>
      {/* <Helmet>
        <title>{`AltCamp-Dashboard-Community`}</title>
        <meta
          name='description'
          content={`A repository of questions and answers`}
        />
        <link rel='canonical' href={`dashboard/community`} />
      </Helmet> */}
      {createDeleteModal && (
        <div className={communityStyle.creationSuccessOverlay}>
          <div className={communityStyle.creationSuccess}>
            <CloseCircle
              size='20'
              className={communityStyle.closeIcon}
              onClick={handleCreateDeleteModal}
            />
            <div className={communityStyle.successIcon}>
              <img src={greenCheck} alt='' className={communityStyle.check} />
            </div>
            <p className={communityStyle.successText}>
              {location.state.created
                ? 'Your question has been submitted successfully.'
                : location.state.deleted
                ? 'Your question has been deleted successfully.'
                : ''}
            </p>
            <button
              className={communityStyle.successBtn}
              onClick={handleCreateDeleteModal}
            >
              Done
            </button>
          </div>
        </div>
      )}
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
          {sortedQuestions?.map(question => (
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
