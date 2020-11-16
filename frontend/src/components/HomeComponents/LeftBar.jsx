import React, {useContext} from 'react'
import '../../css/HomeComponents/LeftBar.css'
import { Link } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SettingsIcon from '@material-ui/icons/Settings';

function LeftBar() {
    const {userData} = useContext(userContext)
    
    const handleToken = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
        localStorage.removeItem('search-user')
    }

    return (
        <div className="leftbar">
            <h1>Welcome, {userData.username}</h1>
            <div className="leftbar-links">
                <Link to="/home" className="navbar-home"><HomeIcon /> <span>Home</span></Link>
                <Link to="/profile"><PersonIcon /> <span>Profile</span></Link>
                <Link to="/users"><PermContactCalendarIcon /> <span>Users</span></Link>
                <Link to="/settings"><SettingsIcon /> <span>Settings</span></Link>
                <Link to="/" onClick={handleToken}><ExitToAppIcon /> <span>Log out</span></Link>
            </div>
        </div>
    )
}

export default LeftBar
