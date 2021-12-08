import React, { useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ALL_POSTS } from '../../utils/queries';
import { NEW_ANNOUNCEMENT } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
// import Auth from "../../utils/auth";
import Post from '../../components/Post';

const MessageBoard = () => {
    const { loading, data , refetch} = useQuery(QUERY_ALL_POSTS);
    // data && console.log(data.getAllPosts.slice(0))
    const [state, dispatch] = useStoreContext();

    // UPDATES GLOBAL STATE FOR "NEW ANNOUNCEMENTS" WHEN THERE ARE UNSEEN ANNOUNCEMENTS
    useEffect(() => {
        let announcements = undefined;

        if (data && state.currentUser) {announcements = data.getAllPosts.filter(post => post.announcement)}

        let newAnnouncement = false;

        announcements && announcements.forEach(post => {
            if (!post.viewedBy.includes(state.currentUser._id)){
                newAnnouncement = true;
            }
        });

        newAnnouncement && dispatch({
            type: NEW_ANNOUNCEMENT,
            newAnnouncement: true
        });
    }, [data, state.currentUser, dispatch, loading])

    return <div>
        {loading ? <h1>LOADING</h1>
            : data.getAllPosts.slice(0).reverse().map((post, index) => !post.announcement && <Post props={post} key={index} />)}
        {/* {postData && postData.getAllPosts.slice(0).reverse().map((post, index) => post.announcement && <Post props={post} key={index}/>)} */}
    </div>
}

export default MessageBoard