import { useState, useRef, useEffect } from 'react'

import askQuestionPageStyles from './askquestionpage.module.css'

import { ArrowCircleLeft } from 'iconsax-react'

import { useParams, useNavigate, Link } from 'react-router-dom'
import RichEditor from './../richeditor/richeditor'

import { useCreateQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlice'
import Toaster from '../../../../../components/Toaster/Toaster'


export default function AskQuestionPage () {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [emptyTitle, setEmptyTitle] = useState(false)

  const [toastText, setToastText] = useState('')
  const [toastType, setToastType] = useState('info')

  const { question } = useParams()
  const navigate = useNavigate()

  const ref = useRef(null)

  const [createQuestion, { data, isLoading, isSuccess, isError, error }] =
    useCreateQuestionMutation()

  const handleCreateQuestion = () => {
    createQuestion({
      title,
      body
      // tags: ['react', 'javascript', 'nodejs', 'express']
    })
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/community', { state: { created: true } })
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccess) {
      // console.log('data:', data)
      setToastText(data.message)
      setToastType('success')
    } else if (isError) {
      setToastText(error.data.message)
      setToastType('error')
    }
  }, [data, isLoading, isSuccess, isError, error])

  return (
    <div className={askQuestionPageStyles.container}>
      <div className={askQuestionPageStyles.header}>
        <div
          className={askQuestionPageStyles.back}
          onClick={() => navigate(-1)}
        >
          <ArrowCircleLeft
            size='23'
            className={askQuestionPageStyles.backIcon}
          />
          <div className={askQuestionPageStyles.backText}>
            Back to community
          </div>
        </div>
        <div className={askQuestionPageStyles.headerGroup}>
          <h3 className={askQuestionPageStyles.title}>
            Ask the Community a Question
          </h3>
        </div>
      </div>

      <div className={askQuestionPageStyles.questionForm}>
        <div className={askQuestionPageStyles.titleGroup}>
          <div className={askQuestionPageStyles.titleHeader}>
            <h3 className={askQuestionPageStyles.titleText}>Title</h3>
            <p className={askQuestionPageStyles.titleDescription}>
              Give your question a brief and specific title. (This will serve
              the question heading).
            </p>
          </div>
          <div className={askQuestionPageStyles.input}>
            <input
              type='text'
              placeholder=''
              className={askQuestionPageStyles.inputField}
              value={title}
              onChange={e => {
                setTitle(e.target.value)
                setEmptyTitle(false)
              }}
              style={{
                border: emptyTitle && '1px solid red'
              }}
            />
            <button
              className={askQuestionPageStyles.next}
              onClick={() => {
                if (title !== '') {
                  tinyMCE.activeEditor.focus()
                  document.querySelector('.tox-tinymce').scrollIntoView()
                } else {
                  setEmptyTitle(true)
                }
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div className={askQuestionPageStyles.bodyGroup}>
          <div className={askQuestionPageStyles.bodyHeader}>
            <h3 className={askQuestionPageStyles.bodyText}>
              Question description
            </h3>
            <p className={askQuestionPageStyles.bodyDescription}>
              Explain your question in details and be clear on what you need
              answers to.
            </p>
          </div>
          <div className={askQuestionPageStyles.textarea}>
            <RichEditor setBody={setBody} />
            <button
              className={askQuestionPageStyles.next}
              onClick={() => {
                if (body !== '') {
                  // document.querySelector('.submit').focus()
                  ref.current.scrollIntoView()
                }
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div className={askQuestionPageStyles.tagsGroup}>
          <div className={askQuestionPageStyles.tagsHeader}>
            <h3 className={askQuestionPageStyles.tagsText}>Tags</h3>
            <p className={askQuestionPageStyles.tagsDescription}>
              These show the category and the specifics of your question
              (Maximum of 4)
            </p>
          </div>
          <div className={askQuestionPageStyles.tags}>
            <input
              type='text'
              placeholder=''
              className={askQuestionPageStyles.tagsField}
              disabled={true}
            />
          </div>
        </div>

        {/* error message ui */}
        <Toaster
          show={!!toastText}
          type={toastType}
          message={toastText}
          onClick={() => setToastText('')}
        />
        {/* succesful message */}
        {isSuccess && (
          <div className={askQuestionPageStyles.successBody}>
            <p className={askQuestionPageStyles.successText}>
              Question created successfully
            </p>
          </div>
        )}

        <div className={askQuestionPageStyles.submit}>
          <button
            ref={ref}
            className={askQuestionPageStyles.submitBtn}
            onClick={handleCreateQuestion}
            disabled={isLoading}
            style={{
              cursor: isLoading && 'not-allowed',
              backgroundColor: isLoading && '#e5e5e5'
            }}
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  )
}
