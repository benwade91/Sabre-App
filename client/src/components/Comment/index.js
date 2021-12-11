import React from 'react';
import { DELETE_COMMENT } from '../../utils/mutations';
import { QUERY_ALL_POSTS } from '../../utils/queries';
import { useMutation } from "@apollo/client";

export const Comment = ({ props, postId }) => {

    const [deleteComment,] = useMutation(DELETE_COMMENT);

    console.log(props);

    const handleDelete = () => {
        deleteComment({
            variables: {
                _id: props._id,
                post: postId
            },
            refetchQueries: [{ query: QUERY_ALL_POSTS }],
        })
        // window.location.reload()
    }

    return (
        <div>
            <p className='ms-3'>{props.content} -
                <span className='fw-light'>{props.username}</span>
                <span onClick={handleDelete}>  ❌</span>
            </p>
        </div>
    )
}
