import { Avatar } from '@material-ui/core'
import React from 'react'
import '../css/UsersProfile.css'

function UsersProfile({user}) {
    return (
        <div className="usersProfile">
            <Avatar className="usersProfile-avatar" src={user.avatar}/>
            <div>
                <div className="userProfile-name">
                    <p className="userProfile-p">First name: <b>{user.name}</b></p>
                    <p>Last name: <b>{user.lastname}</b></p>
                </div>
                <div className="userProfile-data">
                    <p className="userProfile-p">Username: <b>@{user.username}</b></p>
                    <p>Email: <b>{user.email}</b></p>
                </div>
            </div>
        </div>
    )
}

export default UsersProfile
