import React, {useState, useContext} from 'react'
import '../css/Navbar.css'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { userContext } from '../context/userContext'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SettingsIcon from '@material-ui/icons/Settings';

function Navbar() {
    const [inputUser, setInputUser] = useState('')
    const {searchUser, setSearchUser} = useContext(userContext)
    const history = useHistory()

    const handleToken = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
        localStorage.removeItem('search-user')
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios.get(`${process.env.REACT_APP_API_KEY}/posts/user_posts/${inputUser}`)
        .then((res) => {
            setSearchUser(res.data)
            localStorage.setItem('search-user', JSON.stringify(res.data))      
            history.push(`/user/${inputUser}`)
            setInputUser('')
        })
    }

    return (
        <div className="navbar">
            <h2>Social Media App</h2>
            <form onSubmit={handleOnSubmit}>
                <button type="submit"><SearchIcon className="navbar-icon"/></button>
                <input type="text" placeholder="Search user" value={inputUser} onChange={e => setInputUser(e.target.value)}/>
            </form>
            <div className="navbar-links">
                <Link to="/home" className="navbar-links-home"><HomeIcon /></Link>
                <Link to="/profile"><PersonIcon /></Link>
                <Link to="/users"><PermContactCalendarIcon /></Link>
                <Link to="/settings"><SettingsIcon /></Link>
                <Link to="/" onClick={handleToken}><ExitToAppIcon /></Link>
            </div>
        </div>
    )
}

export default Navbar
