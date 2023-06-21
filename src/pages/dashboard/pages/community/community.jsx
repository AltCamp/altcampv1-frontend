import { useEffect, useState } from 'react'

import communityStyle from './community.module.css'

import Questioncard from './questioncard/questioncard'

import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams
} from 'react-router-dom'

import { useGetAllQuestionsQuery } from '../../../../app/slices/apiSlices/communitySlice'

import { CloseCircle } from 'iconsax-react'

import greenCheck from '../../../../assets/general/greencreatepostcheck.svg'

import { Helmet } from 'react-helmet-async'

export default function Community () {
  const [sortedQuestions, setSortedQuestions] = useState()
  const [createDeleteModal, setCreateDeleteModal] = useState(false)
  const [page, setPage] = useState(1)

  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams.get('page'))

  const { data, isLoading, isSuccess, isError, error } =
    useGetAllQuestionsQuery({
      page: searchParams.get('page') ? searchParams.get('page') : 1
    })

  const questions = data?.data

  const meta = data?.meta

  // console.log(meta)

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0)
    }
  }, [searchParams.get('page'), data])

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
            to={'/dashboard/community/ask'}
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
        {questions && questions.length > 0 && (
          <div className={communityStyle.pagination}>
            <button
              className={communityStyle.previousBtn}
              onClick={() => setSearchParams({ page: meta?.currentPage - 1 })}
              disabled={meta?.currentPage === 1}
            >
              Previous
            </button>
            {
              // create an array of page numbers
              [...Array(meta?.totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={
                    meta?.currentPage === index + 1
                      ? communityStyle.active
                      : communityStyle.pageBtn
                  }
                  onClick={() => setSearchParams({ page: index + 1 })}
                >
                  {index + 1}
                </button>
              ))
            }
            <button
              className={communityStyle.nextBtn}
              onClick={() => setSearchParams({ page: meta?.currentPage + 1 })}
              disabled={meta?.currentPage === meta?.totalPages}
            >
              Next
            </button>
            <div className={communityStyle.pageCount}>
              {/* <span className={communityStyle.currentPage}>
                {meta?.currentPage}
              </span> */}
              <input
                type='number'
                className={communityStyle.currentPage}
                value={page}
                onChange={e => setPage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setSearchParams({ page })
                  }
                }}
                onKeyUp={e => {
                  if (Number(e.target.value) > meta?.totalPages) {
                    setPage(meta?.totalPages)
                  }
                }}
              />

              <span className={communityStyle.divider}>/</span>
              <span className={communityStyle.totalPage}>
                {meta?.totalPages}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
