import React, {useContext, useState} from 'react'
import '../css/Login.css'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import { Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { userContext } from '../context/userContext';

function Login() {
    const history = useHistory()
    const {setUserData} = useContext(userContext)
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState()
    
    const {email, password} = loginUser
    const handleOnChange = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_KEY}/login`, loginUser)
        .then((res) => {
            const { name, lastname, avatar, username, email } = res.data.user;
            const newUserData = { name, lastname, avatar, username, email };
            setUserData(newUserData);
            localStorage.setItem('user-data', JSON.stringify(newUserData))      
            localStorage.setItem("auth-token", res.data.token)
            history.push("/home")   
        })
        .catch(err => {
            err.response.data.msg && setError(err.response.data.msg)
        })  
    }  

    return (
        <div className="login">
            <h1>Social media App</h1>
            <div className="login-left">
                <div>
                    <h1>Social media App</h1>
                    <h3><SearchIcon className="login-left-icon" /> Follow what interests you.</h3>
                    <h3><PeopleOutlineIcon className="login-left-icon"/>  Find out what people are talking about.</h3>
                    <h3><ChatBubbleOutlineIcon className="login-left-icon"/>Follow what interests you. Join the conversation.</h3>
                </div>
            </div>
            <div className="login-right">
                <form onSubmit={handleOnSubmit} className="login-form">
                {error ? <h4 className='login-error'>{error}</h4> : ""}
                    <input type="email" placeholder="Email" value={email} name='email' onChange={e => handleOnChange(e)}/>
                    <input type="password" placeholder="Password" value={password} name='password' onChange={e => handleOnChange(e)}/>
                    <Button type="submit" variant="contained">Log in</Button>
                    <div></div>
                    <p>Don't have an account? <Link to="/register">Click here</Link></p>
                </form>
                <h1>Raise your word</h1> 
            </div>
        </div>
    )
}

export default Login
