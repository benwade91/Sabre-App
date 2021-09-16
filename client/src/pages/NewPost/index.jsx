import React from 'react'

const NewPost = () => {
    return <>
        <div>
            <input type="text" name="title" placeholder='title'/>
            <textarea name="body" cols="30" rows="10" placeholder='fill me up buttercup...'></textarea>
        </div>
    </>
}

export default NewPost
