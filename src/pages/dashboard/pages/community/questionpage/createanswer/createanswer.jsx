import { useState } from 'react'

import createAnswerStyles from './createanswer.module.css'
import RichEditor from './../../richeditor/richeditor'

export default function Createanswer () {
  const [body, setBody] = useState('')

  return (
    <div className={createAnswerStyles.container}>
      <form className={createAnswerStyles.form}>
        <label htmlFor='answer' className=''>
          Your Answer
        </label>
        <RichEditor setBody={setBody} />
        <button className={createAnswerStyles.submitBtn} disabled={true}>
          Send Answer
        </button>
      </form>
    </div>
  )
}
