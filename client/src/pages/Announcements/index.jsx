import React, {useEffect} from 'react';
import Post from '../../components/Post';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ALL_POSTS } from '../../utils/queries';
import { NEW_ANNOUNCEMENT } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

const Announcements = () => {
    const { loading: postLoading, data: postData } = useQuery(QUERY_ALL_POSTS);
    const[,dispatch] = useStoreContext()

useEffect(() => {
    dispatch({
            type: NEW_ANNOUNCEMENT,
            newAnnouncement: false
        })
}, [dispatch])

    return <div>
        {postLoading && <h1>LOADING</h1>}
        {postData && postData.getAllPosts.slice(0).reverse().map((post, index) => post.announcement && <Post props={post} key={index} />)}
    </div>
};

export default Announcements
