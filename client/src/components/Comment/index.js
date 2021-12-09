import React from 'react';

export const Comment = ({props}) => {

    return (
        <div>
        <p className='ms-3'>{props.content} -<span className='fw-light'>{props.username}</span></p>
        </div>
    )
}
