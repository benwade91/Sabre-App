import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import {QUERY_ALL_POSTS} from '../../utils/queries';

const MessageBoard = () => {
    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    console.log(data)
    return <div>
    { loading ? <h1>LOADING</h1> 
    : data.getAllPosts.slice(0).reverse().map((post, index) => <h1 key={index}>{post.title}</h1>)}
    </div>
}

export default MessageBoard