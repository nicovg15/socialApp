import React, {useContext} from 'react'
import '../css/SingleUser.css'
import { userContext } from '../context/userContext'
import LeftBar from './HomeComponents/LeftBar'
import Navbar from './Navbar'
import Trending from './HomeComponents/Trending'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
      marginRight: 20
    },
  }));

function SingleUser() {
    const history = useHistory()
    const {userData} = useContext(userContext)
    const {searchUser, setSearchUser} = useContext(userContext)
    const classes = useStyles();

    const token = localStorage.getItem("auth-token");
    const deleteTweet = async (postId) => {
        await axios.delete(`${process.env.REACT_APP_API_KEY}/posts/delete_post/${postId}`, {
            headers: {"auth-token": token}
        })
        history.replace('/profile')
    }

    return (
        <div className="singleUser">
            <Navbar />
            <div className="singleUser-box">
                <LeftBar />
                <div className="singleUser-main">
                    <div className="singleUser-info">
                        {searchUser.slice(0, 1).map(user => (
                            <div key={user._id} className="singleUser-avatar">
                                <Avatar className={classes.large} src={user.avatar}/>
                                <div>
                                    <h4>{user.name} {user.lastname}</h4>
                                    <h6>@{user.username}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='profile-main'>
                        {searchUser != 0 ? searchUser.map(user => (
                            <div className="tweetProfile" key={user._id}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Avatar src={user.avatar}/>
                                    <div className="tweetProfile-name-delete">
                                        <div>
                                            <span className="tweetProfile-name">{user.name} </span>
                                            <span className="tweetProfile-username">@{user?.username}</span>
                                        </div>
                                        {userData.username === user.username ? 
                                            (<DeleteIcon onClick={() => deleteTweet(user._id)} style={{marginLeft: 20}}/>) : ""}
                                    </div>
                                </div>
                                <span className="tweetProfile-content">{user.textOfThePost}</span><br/>
                                <span className="tweetProfile-time">{moment(user.date).format('lll')}</span>
                            </div>
                        )).reverse() : <h3 className="profile-noposts">The user has no posts</h3>}
                    </div>
                </div>
                <Trending />
            </div>
        </div>
    )
}

export default SingleUser
