import { useEffect, useState } from 'react'

import feedStyle from './feed.module.css'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import { ProfileCircle, CloseCircle } from 'iconsax-react'

import { RiImageLine } from 'react-icons/ri'

import Postcard from './postcard/postcard'

import { useGetAllPostsQuery } from '../../../../app/slices/apiSlices/feedSlice'

import { useSelector } from 'react-redux'
import Createpost from './createpost/createpost'

export default function Feed () {
  const [toggleCreatePost, setToggleCreatePost] = useState(false)

  const { user } = useSelector(state => state?.user?.user)

  const { data, isLoading, isSuccess, isError, error } = useGetAllPostsQuery()

  const [sortedPosts, setSortedPosts] = useState([])
  // const [posts, setPosts] = useState(data?.data)
 
  const posts = data?.data

  // const [latestPosts, setLatestPosts] = useState(posts)

  useEffect(() => {
    if (posts) {
      // create a copy of the posts array
      const copyPosts = [...posts]
      const thePosts = copyPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setSortedPosts(thePosts)
    }
  }, [isSuccess])


  const handleToggleCreatePost = () => {
    setToggleCreatePost(!toggleCreatePost)
  }

  useEffect(() => {
    if (toggleCreatePost) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [toggleCreatePost])

  // console.log(toggleCreatePost)

  return (
    <div className={feedStyle.container}>
      {toggleCreatePost && (
        <div className={feedStyle.toggleCreateOverlay}>
          <div className={feedStyle.toggleCreate}>
            <CloseCircle
              size='20'
              className={feedStyle.closeIcon}
              onClick={handleToggleCreatePost}
            />
            <Createpost setToggleCreatePost={setToggleCreatePost} />
          </div>
        </div>
      )}
      <div className={feedStyle.sectionOne}>
        <div className={feedStyle.header}>
          <div className={feedStyle.title}>
            <h1 className={feedStyle.h1}>Feed</h1>
            <p className={feedStyle.p}>
              Explore and see what other people have posted
            </p>
          </div>
        </div>

        <div className={feedStyle.createPostInput}>
          <Link
            to={`/dashboard/users/${user?._id}`}
            className={feedStyle.avatar}
          >
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt=''
                className={feedStyle.img}
              />
            ) : (
              <ProfileCircle
                size={45}
                color='#555555'
                className={feedStyle.iconAvatar}
              />
            )}
          </Link>
          <input
            type='text'
            placeholder="What's on your mind?"
            className={feedStyle.inputField}
            onFocus={handleToggleCreatePost}
          />
          <div className={feedStyle.media}>
            <RiImageLine size='24' color='#555555' />
          </div>
        </div>

        <div className={feedStyle.posts}>
          {isLoading && (
            <div className={feedStyle.loading}>
              <div className={feedStyle.loader}></div>
            </div>
          )}
          {posts &&
            !isLoading &&
            sortedPosts?.map(post => <Postcard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  )
}
