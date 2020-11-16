import React, {useEffect, useState} from 'react'
import '../css/Home.css'
import axios from 'axios'
import Navbar from './Navbar'
import LeftBar from './HomeComponents/LeftBar'
import Trending from './HomeComponents/Trending'
import Tweet from './HomeComponents/Tweet'
import Button from '@material-ui/core/Button';

function Home() {
    const [posts, setPost] = useState([])
    const [createPost, setCreatePost] = useState('')
    
    const token = localStorage.getItem("auth-token");
    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_KEY}/posts`, {textOfThePost: createPost}, {
            headers: { 'auth-token': token },
        })
        .then((res) => {setCreatePost("")})
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/posts`)
        .then(res => {
            setPost(res.data)
        })
    }, [createPost])

    return (
        <div className="home">
            <Navbar />
            <div className="home-wrapper">
                <LeftBar />
                <div className="home-tweet">
                    <form onSubmit={handleOnSubmit}>
                        <input maxLength={90} type="text" placeholder="What's happening?" value={createPost} onChange={e => setCreatePost(e.target.value)}/>
                        <Button disabled={createPost.length == 0} variant="contained" type="submit">Tweet</Button>
                    </form>
                    <div className="home-main">
                        {posts.map(post => ( <Tweet key={post._id} post={post}/> )).reverse()}
                    </div>
                </div>
                <Trending />
            </div>
        </div>
    )
}

export default Home
