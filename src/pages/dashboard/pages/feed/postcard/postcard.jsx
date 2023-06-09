import { Link } from 'react-router-dom'

import postCardStyles from './postcard.module.css'

import {
  Heart,
  ArchiveAdd,
  Edit,
  ProfileCircle,
  MessageText1
} from 'iconsax-react'

import { FaHeart, FaRegHeart } from 'react-icons/fa'

import ReactTimeAgo from 'react-time-ago'

import { useLikePostMutation } from '../../../../../app/slices/apiSlices/feedSlice'

export default function Postcard ({ post }) {
  // console.log(post)

  const [likePost, { data, isLoading, isSuccess, isError, error }] =
    useLikePostMutation()

  const handleLikePost = () => {
    likePost(post._id)
  }

  // console.log(post.upvotedBy.includes(post.author._id))

  return (
    <div className={postCardStyles.container}>
      <div className={postCardStyles.content}>
        <div className={postCardStyles.header}>
          <div className={postCardStyles.avatar}>
            {post?.author?.profilePicture ? (
              <img
                src={post?.author?.profilePicture}
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
          </div>
          <div className={postCardStyles.info}>
            <Link
              to={`/dashboard/users/${post?.author._id}`}
              className={postCardStyles.name}
            >
              {post.author.firstName} {post.author.lastName}
            </Link>
            <div className={postCardStyles.timePosted}>
              {<ReactTimeAgo date={post.createdAt} locale='en-US' />}
            </div>
          </div>
        </div>

        <div className={postCardStyles.body}>
          <div className={postCardStyles.text}>
            <p>{post.content}</p>
          </div>
          {/* <div className={postCardStyles.media}>
            <img src={postMedia} alt='' className='' />
          </div> */}
        </div>

        <div className={postCardStyles.icons}>
          <div className={postCardStyles.left}>
            <div className={postCardStyles.like}>
              {post.upvotedBy.includes(post.author._id) ? (
                <FaHeart
                  size={20}
                  color='#555555'
                  className={postCardStyles.icon}
                  fill='red'
                  onClick={handleLikePost}
                />
              ) : (
                <FaRegHeart
                  size={20}
                  color='#555555'
                  className={postCardStyles.icon}
                  onClick={handleLikePost}
                />
              )}
              <div className={postCardStyles.count}>{post.upvotes}</div>
            </div>
            <div className={postCardStyles.divider}></div>
            <div className={postCardStyles.comment}>
              <MessageText1
                size={20}
                color='#555555'
                className={postCardStyles.icon}
              />
              <div className={postCardStyles.count}>
                {post.comments?.length}
              </div>
            </div>
          </div>
          <div className={postCardStyles.right}>
            <div className={postCardStyles.bookmark}>
              <ArchiveAdd
                size={20}
                color='#555555'
                className={postCardStyles.icon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
