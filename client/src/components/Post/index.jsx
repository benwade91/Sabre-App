import React from 'react'

const Post = (props) => {
    const { content, title, user, whatGym } = props.props;
    console.log(props);
    return (
        <div className="card mb-3">
            {/* <img src="..." class="card-img-top" alt="..." /> */}
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{content}</p>
                <p class="card-text"><small class="text-muted">{whatGym}</small></p>
                <p class="card-text"><small class="text-muted">{user.username}</small></p>
            </div>
        </div>

    )
}

export default Post

