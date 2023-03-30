import createAnswerStyles from './createanswer.module.css'

export default function Createanswer () {
  return (
    <div className={createAnswerStyles.container}>
      <form className={createAnswerStyles.form}>
        <label htmlFor='answer' className=''>
          Your Answer
        </label>
        <textarea
          name='answer'
          id='answer'
          cols='30'
          rows='10'
          className={createAnswerStyles.textarea}
        ></textarea>
        <button className={createAnswerStyles.submitBtn}>Send Answer</button>
      </form>
    </div>
  )
}
