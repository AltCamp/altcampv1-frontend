import { useEffect, useState } from 'react'

import feedStyle from './feed.module.css'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import { Add } from 'iconsax-react'

import Postcard from './postcard/postcard'

import { useGetAllPostsQuery } from '../../../../app/slices/apiSlices/feedSlice'

export default function Feed () {
  // const [posts, setPosts] = useState()
  const navigate = useNavigate()
  const location = useLocation()

  const { data, isLoading, isSuccess, isError, error } = useGetAllPostsQuery()

  const [sortedPosts, setSortedPosts] = useState([])

  const posts = data?.data

  
  // useEffect(() => {
  //   setPosts(data?.data)
  // }, [data, isSuccess])

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

  // console.log(sortedPosts)

  return (
    <div className={feedStyle.container}>
      <div className={feedStyle.sectionOne}>
        <div className={feedStyle.header}>
          <div className={feedStyle.title}>
            <h1 className={feedStyle.h1}>Feed</h1>
            <p className={feedStyle.p}>
              Explore and see what other people have posted
            </p>
          </div>
          <Link to={'/dashboard/createpost'} className={feedStyle.postCta}>
            <Add size='32' color='#FFFFFF' />
            Add a post
          </Link>
        </div>

        <div className={feedStyle.posts}>
          {isLoading && (
            <div className={feedStyle.loading}>
              <div className={feedStyle.loader}></div>
            </div>
          )}
          {sortedPosts?.map(post => (
            <Postcard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
