import React from 'react';
import Post from '../../components/Post'
import { useQuery } from "@apollo/react-hooks";
import {QUERY_ALL_POSTS , QUERY_USER} from '../../utils/queries';

const Announcements = () => {
    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    const { loading_USER, data_USER } = useQuery(QUERY_USER);
    console.log(data_USER)

    console.log(data)
    return <div>
    { loading && <h1>LOADING</h1> }
    {data && data.getAllPosts.slice(0).reverse().map((post, index) => post.announcement && <Post props={post} key={index}/>)}
    </div>
}

export default Announcements
