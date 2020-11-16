import React from 'react'
import '../css/TweetProfile.css'
import { Avatar } from '@material-ui/core'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'


function TweetProfile({post}) {

    const token = localStorage.getItem("auth-token");
    const deleteTweet = (postId) => {
        axios.delete(`${process.env.REACT_APP_API_KEY}/posts/delete_post/${postId}`, {
            headers: {"auth-token": token}
        })
        window.location.reload();
    }

    return (
        <div className="tweetProfile" key={post._id}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar src={post.avatar}/>
                <div className="tweetProfile-name-delete">
                    <div>
                        <span className="tweetProfile-name">{post.name} </span>
                        <span className="tweetProfile-username">@{post?.username}</span>
                    </div>
                    <DeleteIcon onClick={() => deleteTweet(post._id)} style={{marginLeft: 20}}/>
                </div>
            </div>
            <span className="tweetProfile-content">{post.textOfThePost}</span><br/>
            <span className="tweetProfile-time">{moment(post.date).format('lll')}</span>
        </div>
    )
}

export default TweetProfile
