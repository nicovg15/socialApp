import React from 'react'
import '../../css/HomeComponents/Tweet.css'
import { Avatar } from '@material-ui/core'
import moment from 'moment'

function Tweet({post}) {
    return (
        <div className="tweet" key={post._id}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar src={post.avatar}/>
                <div>
                    <span className="tweet-name">{post.name}</span>
                    <span className="tweet-username">@{post?.username}</span>
                </div>
            </div>
            <span className="tweet-content">{post.textOfThePost}</span><br/>
            <span className="tweet-time">{moment(post.date).format('lll')}</span>
        </div>
    )
}

export default Tweet
