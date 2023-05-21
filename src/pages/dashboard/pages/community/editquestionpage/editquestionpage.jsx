import { useState, useRef, useEffect } from 'react'

import editQuestionPageStyles from './editquestionpage.module.css'

import { ArrowCircleLeft } from 'iconsax-react'

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import RichEditor from '../richeditor/richeditor'

import { useUpdateQuestionMutation } from '../../../../../app/slices/apiSlices/communitySlices/questionSlice'

export default function EditQuestionPage () {
  const location = useLocation()
  

  const editableQuestionState = location?.state

  const [title, setTitle] = useState(editableQuestionState?.title)
  const [body, setBody] = useState(editableQuestionState?.body)
  const [emptyTitle, setEmptyTitle] = useState(false)

  const [errorText, setErrorText] = useState('')

  const { question } = useParams()
  const navigate = useNavigate()

  const ref = useRef(null)

  const [updateQuestion, { data, isLoading, isSuccess, isError, error }] =
    useUpdateQuestionMutation()

  const handleUpdateQuestion = () => {
    updateQuestion({
      id: editableQuestionState?.question,
      body: {
        title,
        body
        // tags: ['react', 'javascript', 'nodejs', 'express']
      }
    })
  }

  // console.log(editableQuestionState)

  useEffect(() => {
    if (isSuccess) {
      // navigate('/dashboard/community', { state: { created: true } })
      navigate(-1)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccess) {
      // console.log('data:', data)
      setErrorText('')
    } else if (isError) {
      setErrorText(error.data.message)
    }
  }, [data, isLoading, isSuccess, isError, error])

  return (
    <div className={editQuestionPageStyles.container}>
      <div className={editQuestionPageStyles.header}>
        <div
          className={editQuestionPageStyles.back}
          onClick={() => navigate(-1)}
        >
          <ArrowCircleLeft
            size='23'
            className={editQuestionPageStyles.backIcon}
          />
          <div className={editQuestionPageStyles.backText}>
            Back to community
          </div>
        </div>
        <div className={editQuestionPageStyles.headerGroup}>
          <h3 className={editQuestionPageStyles.title}>Edit Your Question</h3>
        </div>
      </div>

      <div className={editQuestionPageStyles.questionForm}>
        <div className={editQuestionPageStyles.titleGroup}>
          <div className={editQuestionPageStyles.titleHeader}>
            <h3 className={editQuestionPageStyles.titleText}>Title</h3>
            <p className={editQuestionPageStyles.titleDescription}>
              Give your question a brief and specific title. (This will serve
              the question heading).
            </p>
          </div>
          <div className={editQuestionPageStyles.input}>
            <input
              type='text'
              placeholder=''
              className={editQuestionPageStyles.inputField}
              value={
                editableQuestionState ? editableQuestionState.title : title
              }
              onChange={e => {
                setTitle(e.target.value)
                setEmptyTitle(false)
              }}
              style={{
                border: emptyTitle && '1px solid red'
              }}
            />
            <button
              className={editQuestionPageStyles.next}
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

        <div className={editQuestionPageStyles.bodyGroup}>
          <div className={editQuestionPageStyles.bodyHeader}>
            <h3 className={editQuestionPageStyles.bodyText}>
              Question description
            </h3>
            <p className={editQuestionPageStyles.bodyDescription}>
              Explain your question in details and be clear on what you need
              answers to.
            </p>
          </div>
          <div className={editQuestionPageStyles.textarea}>
            <RichEditor setBody={setBody} body={body} />
            <button
              className={editQuestionPageStyles.next}
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

        <div className={editQuestionPageStyles.tagsGroup}>
          <div className={editQuestionPageStyles.tagsHeader}>
            <h3 className={editQuestionPageStyles.tagsText}>Tags</h3>
            <p className={editQuestionPageStyles.tagsDescription}>
              These show the category and the specifics of your question
              (Maximum of 4)
            </p>
          </div>
          <div className={editQuestionPageStyles.tags}>
            <input
              type='text'
              placeholder=''
              className={editQuestionPageStyles.tagsField}
              disabled={true}
            />
          </div>
        </div>

        {/* error message ui */}
        {errorText && (
          <div className={editQuestionPageStyles.errorBody}>
            <p className={editQuestionPageStyles.errorText}>{errorText}</p>
          </div>
        )}

        {/* succesful message */}
        {isSuccess && (
          <div className={editQuestionPageStyles.successBody}>
            <p className={editQuestionPageStyles.successText}>
              Question updated successfully
            </p>
          </div>
        )}

        <div className={editQuestionPageStyles.submit}>
          <button
            ref={ref}
            className={editQuestionPageStyles.submitBtn}
            onClick={handleUpdateQuestion}
            disabled={isLoading}
            style={{
              cursor: isLoading && 'not-allowed',
              backgroundColor: isLoading && '#e5e5e5'
            }}
          >
            Update Question
          </button>
        </div>
      </div>
    </div>
  )
}
