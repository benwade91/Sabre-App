import React from 'react';
import Post from '../../components/Post'
import { useQuery } from "@apollo/react-hooks";
import {QUERY_ALL_POSTS , QUERY_USER} from '../../utils/queries';

const Announcements = () => {
    const { loading, data: postData } = useQuery(QUERY_ALL_POSTS);
    const { loading: loadingUser, data: userData } = useQuery(QUERY_USER);
    
    // console.log(postData.getAllPosts.reverse())
    // console.log(userData)

    return <div>
    { loading && <h1>LOADING</h1> }
    {postData && postData.getAllPosts.slice(0).reverse().map((post, index) => post.announcement && <Post props={post} key={index}/>)}
    </div>
}

export default Announcements
