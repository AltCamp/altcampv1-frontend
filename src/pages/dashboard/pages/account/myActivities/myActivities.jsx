import React, { useState } from 'react';
import Post from './post';
import Questions from './questions';
import Answers from './answers';

export default function MyActivities() {
    const [render, setRender] = useState("Post")
  return (
    <main className="mx-auto w-[85%] pt-8">
      <section className="">
        <h2 className="text-medium mb-2 text-lg">Activities</h2>
        <p className="text-medium text-sm text-neutral-600">
          manage your posts, question, and other activities here
        </p>
      </section>
      <section className="">
        <article className="h-[3rem] w-full flex relative ">
          <div
            className="h-[inherit] relative w-max cursor-pointer text-center px-8 py-2 z-5"
            onClick={(e) => setRender(e.target.innerHTML)}
            style={render === 'Post' ? { borderBottom: '3px solid var(--secondary-clr-lter-blue)' }
                : {borderBottom: '3px solid var(--neutral-clr-lt-grey'}
            }
          >
            Post
          </div>
          <div
            className="h-[inherit] w-max cursor-pointer px-6 py-2"
            onClick={(e) => setRender(e.target.innerHTML)}
            style={render ===  "Questions" ? { borderBottom: '3px solid var(--secondary-clr-lter-blue)' }
                : {borderBottom: '3px solid var(--neutral-clr-lt-grey'}
            }
          >
            Questions
          </div>
          <div
            className="h-[inherit] w-max cursor-pointer px-6 py-2"
            onClick={(e) => setRender(e.target.innerHTML)}
            style={render === 'Answers' ? { borderBottom: '3px solid var(--secondary-clr-lter-blue)' }
                : {borderBottom: '3px solid var(--neutral-clr-lt-grey'}
            }
          >
            Answers
          </div>
          <div className='border-b-[3px] w-full'>

          </div>

          {/* <hr className="h-1 w-full absolute bottom-0 left-0 bg-[var(--neutral-clr-lt-grey)] z-1" /> */}
        </article>
       
        <article>
          {render === 'Post' ? (
            <Post />
          ) : render ===
          "Questions" ? (
            <Questions />
          ) : (
            <Answers />
          )}
        </article>
      </section>
    </main>
  );
}
