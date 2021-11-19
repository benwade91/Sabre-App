import React, { useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ALL_POSTS } from '../../utils/queries';
import { LOGIN_STATUS, SET_CURRENT_USER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import Auth from "../../utils/auth";

const MessageBoard = () => {
    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    console.log(data)
    const [, dispatch] = useStoreContext();
    
    useEffect(() => {
        Auth.loggedIn() && dispatch({
            type: LOGIN_STATUS,
            loggedIn: true
        })
    })

    return <div>
        {loading ? <h1>LOADING</h1>
            : data.getAllPosts.slice(0).reverse().map((post, index) => <h1 key={index}>{post.title}</h1>)}
    </div>
}

export default MessageBoard