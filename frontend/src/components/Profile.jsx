import React, {useContext, useEffect, useState} from 'react'
import '../css/Profile.css'
import axios from 'axios'
import { userContext } from '../context/userContext'
import Trending from './HomeComponents/Trending'
import Navbar from './Navbar'
import LeftBar from './HomeComponents/LeftBar'
import TweetProfile from './TweetProfile'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginRight: 20
    },
  }));

function Profile() {
    const history = useHistory()
    const [posts, setPost] = useState([])
    const {userData} = useContext(userContext)
    const classes = useStyles();

    const token = localStorage.getItem("auth-token");
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/posts/user_posts`, {
            headers: {'auth-token': token}
        })
        .then(res => {
           setPost(res.data)
        })
    }, [])

    const handleEdit = () => {
        history.push('/edit')
    }


    return (
        <div className="profile">
            <Navbar />
            <div className="profile-wrapper">
                <LeftBar />
                <div className="profile-tweet">
                    <div className='profile-tweet-info'>
                        <div className='profile-tweet-info-avatar'>
                        <Avatar className={classes.large} src={userData?.avatar}/>
                            <div>
                                <h4>{userData?.name} {userData?.lastname}</h4>
                                <h6>@{userData?.username}</h6>
                            </div>
                        </div>
                        <CreateIcon />
                        <Button onClick={handleEdit}>EDIT PROFILE</Button>
                    </div>
                    <div className='profile-main'>
                        {posts != 0 ? posts.map(post => (
                            <TweetProfile key={post._id} post={post}/>
                        )).reverse() : <h3 className="profile-noposts">You have no posts</h3>}
                    </div>
                </div>
                <Trending />
            </div>
        </div>
    )
}

export default Profile
