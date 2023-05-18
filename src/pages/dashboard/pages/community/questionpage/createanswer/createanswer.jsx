import { useState, useEffect } from 'react'

import createAnswerStyles from './createanswer.module.css'
import RichEditor from './../../richeditor/richeditor'

import { useCreateAnswerMutation } from '../../../../../../app/slices/apiSlices/communitySlices/answerSlice'

export default function Createanswer ({ questionId }) {
  const [content, setContent] = useState('')

  const [createAnswer, { data, isSuccess, isLoading, isError, error }] =
    useCreateAnswerMutation()

  const handleCreateAnswer = e => {
    e.preventDefault()
    createAnswer({ content, questionId })
  }

  // set content to empty string after successful answer creation
  useEffect(() => {
    if (isSuccess) {
      setContent('')
    }
  }, [isSuccess])

  // console.log(data)
  // console.log(error)
  // console.log(content)

  return (
    <div className={createAnswerStyles.container}>
      <form className={createAnswerStyles.form} onSubmit={handleCreateAnswer}>
        <label htmlFor='answer' className=''>
          Your Answer
        </label>
        <RichEditor setBody={setContent} body={content} isSuccess={isSuccess} />
        <button className={createAnswerStyles.submitBtn} disabled={isLoading}>
          Send Answer
        </button>
      </form>
    </div>
  )
}
