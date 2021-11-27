import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ALL_POSTS } from '../../utils/queries';
// import { LOGIN_STATUS, SET_CURRENT_USER } from "../../utils/actions";
// import { useStoreContext } from "../../utils/GlobalState";
// import Auth from "../../utils/auth";
import Post from '../../components/Post';

const MessageBoard = () => {
    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    // data && console.log(data.getAllPosts.slice(0))
    // const [, dispatch] = useStoreContext();

    // useEffect(() => {
    //     Auth.loggedIn() && dispatch({
    //         type: LOGIN_STATUS,
    //         loggedIn: true
    //     })
    // },[])

    return <div>
        {loading ? <h1>LOADING</h1>
            : data.getAllPosts.slice(0).reverse().map((post, index) => <Post props={post} key={index}/>)}
            {/* {postData && postData.getAllPosts.slice(0).reverse().map((post, index) => post.announcement && <Post props={post} key={index}/>)} */}
    </div>
}

export default MessageBoard