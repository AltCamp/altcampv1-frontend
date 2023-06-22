import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import postCardStyles from './postcard.module.css'

import {
  Heart,
  ArchiveAdd,
  Edit,
  ProfileCircle,
  MessageText1
} from 'iconsax-react'

import ReactTimeAgo from 'react-time-ago'

import { useLikePostMutation } from '../../../../../app/slices/apiSlices/feedSlice'

import { useSelector } from 'react-redux'

import BookmarkModal from '../../../components/bookmarkmodal/bookmarkmodal'

export default function Postcard ({ post }) {
  const [latestPost, setLatestPost] = useState(post)
  const [likeAnimation, setLikeAnimation] = useState(false)
  const [toggleBookmarkModal, setToggleBookmarkModal] = useState()

  const { user } = useSelector(state => state?.user?.user)

  const [likePost, { data, isLoading, isSuccess, isError, error }] =
    useLikePostMutation()

  const handleLikePost = () => {
    likePost(post._id)
  }

  useEffect(() => {
    if (isSuccess) {
      setLatestPost(data?.data)
      setLikeAnimation(true)

      setTimeout(() => {
        setLikeAnimation(false)
      }, 1100)
    }
  }, [isSuccess])

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
      <Link
        to={`/dashboard/post/${latestPost?._id}`}
        className={postCardStyles.container}
      >
        <div className={postCardStyles.content}>
          <div className={postCardStyles.header}>
            <Link
              to={
                user?._id === latestPost?.author?._id
                  ? `/dashboard/account`
                  : `/dashboard/users/${latestPost?.author._id}`
              }
              className={postCardStyles.avatar}
            >
              {latestPost?.author?.profilePicture ? (
                <img
                  src={latestPost?.author?.profilePicture}
                  alt=''
                  className={postCardStyles.img}
                />
              ) : (
                <ProfileCircle
                  size={45}
                  color='#555555'
                  className={postCardStyles.iconAvatar}
                />
              )}
            </Link>
            <div className={postCardStyles.info}>
              <Link
                to={
                  user?._id === latestPost?.author?._id
                    ? `/dashboard/account`
                    : `/dashboard/users/${latestPost?.author._id}`
                }
                className={postCardStyles.name}
              >
                {latestPost.author.firstName} {latestPost.author.lastName}
              </Link>
              <div className={postCardStyles.timePosted}>
                {<ReactTimeAgo date={latestPost.createdAt} locale='en-US' />}
              </div>
            </div>
          </div>

          <div className={postCardStyles.body}>
            <div className={postCardStyles.text}>
              <p>{latestPost.content}</p>
            </div>
            {/* <div className={postCardStyles.media}>
            <img src={postMedia} alt='' className='' />
          </div> */}
          </div>

          <div className={postCardStyles.icons}>
            <div className={postCardStyles.left}>
              <Link to={`/dashboard`} className={postCardStyles.like}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill={
                    latestPost?.upvotedBy?.includes(user?._id)
                      ? 'red'
                      : '#FFFFFF'
                  }
                  onClick={handleLikePost}
                  className={`${postCardStyles.icon} ${
                    likeAnimation && postCardStyles.likeAnimation
                  }`}
                >
                  <path
                    d='M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z'
                    stroke={
                      latestPost?.upvotedBy?.includes(user?._id)
                        ? 'red'
                        : '#343A40'
                    }
                    strokeWidth='1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </svg>
                <div
                  className={`${postCardStyles.count} ${
                    likeAnimation && postCardStyles.likeAnimation
                  }`}
                  style={{
                    color: latestPost?.upvotedBy?.includes(user?._id)
                      ? 'red'
                      : '#343A40'
                  }}
                >
                  {latestPost.upvotes}
                </div>
              </Link>
              <div className={postCardStyles.divider}></div>
              <div className={postCardStyles.comment}>
                <MessageText1
                  size={20}
                  color='#555555'
                  className={postCardStyles.icon}
                />
                <div className={postCardStyles.count}>
                  {latestPost.comments?.length}
                </div>
              </div>
            </div>
            <div className={postCardStyles.right}>
              <Link to={`/dashboard`} className={postCardStyles.bookmark}>
                <ArchiveAdd
                  size={20}
                  color='#555555'
                  className={postCardStyles.icon}
                  onClick={handleToggleBookmarkModal}
                />
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
