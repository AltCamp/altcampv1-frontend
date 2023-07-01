import { useState, useEffect } from 'react'

import postPageStyles from './postpage.module.css'

import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

import {
  ArrowCircleLeft,
  ArchiveAdd,
  ProfileCircle,
  MessageText1,
  Send2
} from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'

import {
  useLikePostMutation,
  useGetPostByIdQuery,
  useGetAllCommentsQuery,
  useCreateCommentMutation
} from '../../../../../app/slices/apiSlices/feedSlice'

import { useSelector } from 'react-redux'

import Postcomment from './postcomment/postcomment'

import BookmarkModal from '../../../components/bookmarkmodal/bookmarkmodal'

export default function Postpage () {
  const [likeAnimation, setLikeAnimation] = useState(false)
  const [content, setContent] = useState('')
  const [toggleBookmarkModal, setToggleBookmarkModal] = useState()

  const navigate = useNavigate()

  const { user } = useSelector(state => state?.user?.user)

  const { postId } = useParams()

  const {
    data: singlePost,
    isLoading: singlePostLoading,
    isSuccess: singlePostSuccess,
    isError: singlePostIsError,
    error: singlePostError
  } = useGetPostByIdQuery(postId)

  useEffect(() => {
    if (singlePostError) {
      navigate(-1)
    }
  }, [singlePostError])

  const [
    likePost,
    {
      data: likeData,
      isLoading: likeIsLoading,
      isSuccess: likeIsSucccess,
      isError: likeIsSuccess,
      error: likeError
    }
  ] = useLikePostMutation()

  const handleLikePost = () => {
    likePost(postId)
  }

  useEffect(() => {
    if (likeIsSucccess) {
      setLikeAnimation(true)

      setTimeout(() => {
        setLikeAnimation(false)
      }, 1000)
    }
  }, [likeIsSucccess])

  const {
    data: comments,
    isLoading: commentsLoading,
    isSuccess: commentsSuccess,
    isError: commentsIsError,
    error: commentsError
  } = useGetAllCommentsQuery(postId)

  const commentList = comments?.data

  // console.log(commentList)

  const [
    createComment,
    {
      data: createCommentData,
      isLoading: createCommentLoading,
      isSuccess: createCommentSuccess,
      isError: createCommentIsError,
      error: createCommentError
    }
  ] = useCreateCommentMutation()

  const handleCreateComment = e => {
    // e.preventDefault()
    createComment({ content, postId })
  }

  useEffect(() => {
    if (createCommentSuccess) {
      setContent('')
      // scroll to the botttom of the page
      window.scrollTo(0, document.body.scrollHeight)
    }
  }, [createCommentSuccess])

  const post = singlePost?.data

  // console.log(post)

  const handleToggleBookmarkModal = () => {
    setToggleBookmarkModal(!toggleBookmarkModal)
  }

  return (
    <>
      {toggleBookmarkModal && (
        <BookmarkModal
          handleToggleBookmarkModal={handleToggleBookmarkModal}
          postId={post?._id}
          postType={`Post`}
          postTitle={post?.content}
        />
      )}
      <div className={postPageStyles.container}>
        <div className={postPageStyles.back} onClick={() => navigate(-1)}>
          <ArrowCircleLeft size='24' color='#1E1E1E' />
        </div>

        {singlePostLoading && (
          <div className={postPageStyles.container}>
            <div className={postPageStyles.loading}>
              <div className={postPageStyles.loader}></div>
            </div>
          </div>
        )}

        {singlePostSuccess && (
          <div className={postPageStyles.content}>
            <div className={postPageStyles.post}>
              <div className={postPageStyles.content}>
                <div className={postPageStyles.header}>
                  <Link
                    to={
                      post?.author?._id === user?._id
                        ? '/dashboard/account'
                        : `/dashboard/users/${post?.author._id}`
                    }
                    className={postPageStyles.avatar}
                  >
                    {post?.author?.profilePicture ? (
                      <img
                        src={post?.author?.profilePicture}
                        alt=''
                        className={postPageStyles.img}
                      />
                    ) : (
                      <ProfileCircle
                        size={45}
                        color='#555555'
                        className={postPageStyles.iconAvatar}
                      />
                    )}
                  </Link>
                  <div className={postPageStyles.info}>
                    <Link
                      to={
                        post?.author?._id === user?._id
                          ? '/dashboard/account'
                          : `/dashboard/users/${post?.author._id}`
                      }
                      className={postPageStyles.name}
                    >
                      {post?.author.firstName} {post?.author.lastName}
                    </Link>
                    <div className={postPageStyles.timePosted}>
                      {<ReactTimeAgo date={post?.createdAt} locale='en-US' />}
                    </div>
                  </div>
                </div>

                <div className={postPageStyles.body}>
                  <div className={postPageStyles.text}>
                    <p>{post?.content}</p>
                  </div>
                  {/* <div className={postPageStyles.media}>
                <img src={postMedia} alt='' className='' />
              </div> */}
                </div>

                <div className={postPageStyles.icons}>
                  <div className={postPageStyles.left}>
                    <div className={postPageStyles.like}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='20'
                        height='20'
                        viewBox='0 0 24 24'
                        fill={
                          post?.upvotedBy?.includes(user?._id)
                            ? 'red'
                            : '#FFFFFF'
                        }
                        onClick={handleLikePost}
                        className={`${postPageStyles.icon} ${
                          likeAnimation && postPageStyles.likeAnimation
                        }`}
                      >
                        <path
                          d='M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z'
                          stroke={
                            post?.upvotedBy?.includes(user?._id)
                              ? 'red'
                              : '#343A40'
                          }
                          strokeWidth='1'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                      </svg>
                      <div
                        className={`${postPageStyles.count} ${
                          likeAnimation && postPageStyles.likeAnimation
                        }`}
                        style={{
                          color: post?.upvotedBy?.includes(user?._id)
                            ? 'red'
                            : '#343A40'
                        }}
                      >
                        {post?.upvotedBy?.length}
                      </div>
                    </div>
                    <div className={postPageStyles.divider}></div>
                    <div className={postPageStyles.comment}>
                      <MessageText1
                        size={20}
                        color='#555555'
                        className={postPageStyles.icon}
                      />
                      <div className={postPageStyles.count}>
                        {post?.comments?.length}
                      </div>
                    </div>
                  </div>
                  <div className={postPageStyles.right}>
                    <div className={postPageStyles.bookmark}>
                      <ArchiveAdd
                        size={20}
                        color='#555555'
                        className={postPageStyles.icon}
                        onClick={handleToggleBookmarkModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={postPageStyles.divider}></div>

            <div className={postPageStyles.commentSection}>
              <div className={postPageStyles.commentHeader}>All Comments</div>

              <div className={postPageStyles.comments}>
                {commentList?.map(comment => (
                  <Postcomment key={comment._id} comment={comment} />
                ))}
              </div>
            </div>

            <div className={postPageStyles.commentInput}>
              <div className={postPageStyles.avatar}>
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt=''
                    className={postPageStyles.img}
                  />
                ) : (
                  <ProfileCircle
                    size={45}
                    color='#555555'
                    className={postPageStyles.iconAvatar}
                  />
                )}
              </div>
              <input
                type='text'
                placeholder='Write a comment...'
                value={content}
                className={postPageStyles.inputField}
                onChange={e => setContent(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleCreateComment()
                  }
                }}
                disabled={createCommentLoading}
              />
              <div className={postPageStyles.send}>
                {createCommentLoading ? (
                  <div className={postPageStyles.loaderSend}></div>
                ) : (
                  <Send2
                    size='32'
                    color='#555555'
                    className={postPageStyles.send}
                    onClick={handleCreateComment}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
