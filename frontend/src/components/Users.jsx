import React, {useEffect, useState} from 'react'
import '../css/Users.css'
import axios from 'axios'
import Navbar from './Navbar'
import LeftBar from './HomeComponents/LeftBar'
import UsersProfile from './UsersProfile'

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/users`)
        .then((res) => setUsers(res.data))
    }, [])


    return (
        <div className="users">
            <Navbar />
            <div className="users-box">
                <LeftBar />
                <div className="users-list">
                    <h1>Users</h1>
                    {users.map(user => ( <UsersProfile user={user} key={user._id}/> ))}
                </div>
            </div>
        </div>
    )
}

export default Users
