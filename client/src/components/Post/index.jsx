import React from 'react'

const Post = (props) => {
    const {content, title,user,whatGym } = props.props;
    
    return (
        <div className='postBody'>
        <h1>{title}</h1>
        <p>{content}</p>
        <p>{whatGym}</p>
        </div>
    )
}

export default Post
