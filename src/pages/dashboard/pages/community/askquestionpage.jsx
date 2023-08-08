import { useState, useRef, useEffect } from 'react';

import { ArrowCircleLeft } from 'iconsax-react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import RichEditor from './richeditor';

import { useCreateQuestionMutation } from '../../../../app/slices/apiSlices/contentsSlice';
import Toaster from '../../../../components/Toaster/Toaster';

import VerifyEmailPopUp from '../../components/verifyEmailPopUp';

export default function AskQuestionPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [emptyTitle, setEmptyTitle] = useState(false);

  const [toastText, setToastText] = useState('');
  const [toastType, setToastType] = useState('info');

  const [queryError, setQueryError] = useState();

  const { question } = useParams();
  const navigate = useNavigate();

  const ref = useRef(null);

  const [createQuestion, { data, isLoading, isSuccess, isError, error }] =
    useCreateQuestionMutation();

  const handleCreateQuestion = () => {
    createQuestion({
      title,
      body,
      // tags: ['react', 'javascript', 'nodejs', 'express']
    });
  };

  useEffect(() => {
    if (isSuccess) {
      // console.log('data:', data)
      setToastText(data.message);
      setToastType('success');
      setTimeout(() => navigate('/dashboard/community'), 1000);
    } else if (isError) {
      setToastText(error.data.message);
      setToastType('error');
      setTimeout(() => setToastText(''), 3000);
    }
  }, [isSuccess, isError]);

  return (
    <>
      {/* verifyEmailPopUp */}

      <VerifyEmailPopUp queryError={queryError} setQueryError={setQueryError} />
      <div className="relative flex h-full w-full flex-col p-8 sm:p-2 ">
        <div className="flex flex-col gap-10 border-b-2 border-neutral-500 pb-4 ">
          <div
            className="flex cursor-pointer items-center gap-2 text-[14px] font-medium text-neutral-700  "
            onClick={() => navigate(-1)}
          >
            <ArrowCircleLeft size="23" className="" />
            <div className="">Back to community</div>
          </div>
          <div className="">
            <h3 className="font-medium">Ask the Community a Question</h3>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 py-16">
          <div className="flex w-full flex-col gap-6 rounded-lg border border-neutral-300 px-4 py-8 sm:px-2 sm:py-4 ">
            <div className="flex flex-col gap-2 ">
              <h3 className="font-medium text-neutral-900 ">Title</h3>
              <p className="text-[14px] text-neutral-600 ">
                Give your question a brief and specific title. (This will serve
                the question heading).
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 ">
              <input
                type="text"
                placeholder=""
                className="input focus:border-2 focus:border-secondary-400"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setEmptyTitle(false);
                }}
                style={{
                  border: emptyTitle && '1px solid red',
                }}
              />
              <button
                className="auth-btn w-fit px-3 py-2"
                onClick={() => {
                  if (title !== '') {
                    tinyMCE.activeEditor.focus();
                    document.querySelector('.tox-tinymce').scrollIntoView();
                  } else {
                    setEmptyTitle(true);
                  }
                }}
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 rounded-lg border border-neutral-300 px-4 py-8 sm:px-2 sm:py-4 ">
            <div className="flex flex-col gap-2 ">
              <h3 className="font-medium text-neutral-900 ">
                Question description
              </h3>
              <p className="text-[14px] text-neutral-600 ">
                Explain your question in details and be clear on what you need
                answers to.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 ">
              <RichEditor setBody={setBody} />
              <button
                className="auth-btn w-fit self-end px-3 py-2 "
                onClick={() => {
                  if (body !== '') {
                    // document.querySelector('.submit').focus()
                    ref.current.scrollIntoView();
                  }
                }}
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 rounded-lg border border-neutral-300 px-4 py-8 sm:px-2 sm:py-4 ">
            <div className="flex flex-col gap-2 ">
              <h3 className="font-medium text-neutral-900 ">Tags</h3>
              <p className="text-[14px] text-neutral-600 ">
                These show the category and the specifics of your question
                (Maximum of 4)
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 ">
              <input
                type="text"
                placeholder=""
                className="input focus:border-2 focus:border-secondary-400"
                disabled={true}
              />
            </div>
          </div>

          {/* toast */}
          <Toaster
            show={!!toastText}
            type={toastType}
            message={toastText}
            handleClose={() => setToastText('')}
          />

          <div className="self-end">
            <button
              ref={ref}
              className="auth-btn px-3 py-2"
              onClick={handleCreateQuestion}
              disabled={isLoading}
              style={{
                cursor: isLoading && 'not-allowed',
                backgroundColor: isLoading && '#e5e5e5',
              }}
            >
              Submit Question
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
