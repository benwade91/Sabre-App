import React, { useEffect } from 'react'
import Post from '../../components/Post'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_ALL_POSTS } from '../../utils/queries'
import { NEW_ANNOUNCEMENT } from '../../utils/actions'
import { useStoreContext } from '../../utils/GlobalState'
import './style.css'

const Announcements = () => {
  const { loading: postLoading, data: postData } = useQuery(QUERY_ALL_POSTS)
  const [, dispatch] = useStoreContext()

  useEffect(() => {
    dispatch({
      type: NEW_ANNOUNCEMENT,
      newAnnouncement: false,
    })
  }, [dispatch])

  return (
    <div>
      <h1 className='announcementTitle'>Team Announcements:</h1>
      {postLoading && <h1>LOADING</h1>}
      {postData &&
        postData.getAllPosts
          .slice(0)
          .reverse()
          .map(
            (post, index) =>
              post.announcement && <Post props={post} key={index} />,
          )}
    </div>
  )
}

export default Announcements
