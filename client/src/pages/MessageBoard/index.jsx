import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import {QUERY_ALL_POSTS} from '../../utils/queries';

const MessageBoard = () => {
    const { loading, data } = useQuery(QUERY_ALL_POSTS);
    console.log(data)
    return <div>
MessageBoard
    </div>
}

export default MessageBoard