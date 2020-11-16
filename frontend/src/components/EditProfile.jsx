import React, {useState, useContext} from 'react'
import '../css/EditProfile.css'
import Navbar from './Navbar'
import LeftBar from './HomeComponents/LeftBar'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import {userContext} from '../context/userContext'

function EditProfile() {
    const {userData, setUserData} = useContext(userContext)
    const history = useHistory()
    const [file, setFile] = useState()
    const [error, setError] = useState(false)
    const [editUser, setEditUser] = useState({
        name: '',
        lastname: '',
        username: '',
    })

    const { name, lastname, username, avatar } = editUser
    const handleOnChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value})
    }

    const token = localStorage.getItem("auth-token");
    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_API_KEY}/edit_profile`,{
            name: name,
            lastname: lastname,
            username: username,
            avatar: avatar
        }, {headers: {'auth-token': token}})  
        .then(res => {
            const { name, lastname, avatar, username } = res.data;
            const newUserData = { name, lastname, avatar, username };
            setUserData(newUserData);
            localStorage.setItem('user-data', JSON.stringify(newUserData))    
            setError(false)
            history.push('/profile')
        })
        .catch(err => {
            err.response.data.msg && setError(err.response.data.msg)
        }) 
    }

    return (
        <div className="editProfile">
            <Navbar />
            <div className="editProfile-box">
                <LeftBar />
                <div className="editProfile-right">
                    <div>
                        <h1>Edit profile</h1>
                        {error ? <h3 className="editProfile-error">{error}</h3> : ""}
                        <form className="editProfile-form" onSubmit={handleOnSubmit}>
                            <div>
                                <label htmlFor="firstname">First name:</label>
                                <input type="text" id="firstname" name="name" value={name} onChange={e => handleOnChange(e)}/>
                            </div>
                            <div>
                                <label htmlFor="lastname">Last name:</label>
                                <input type="text" id="lastname" name="lastname" value={lastname} onChange={e => handleOnChange(e)}/>
                            </div>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={username} onChange={e => handleOnChange(e)}/>
                            </div>
                            <Button type="submit">save</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
