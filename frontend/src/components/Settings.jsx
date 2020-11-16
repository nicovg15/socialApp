import React, { useState } from 'react'
import '../css/Settings.css'
import Navbar from './Navbar'
import LeftBar from './HomeComponents/LeftBar'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function Settings() {
    const history = useHistory()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [errorFirst, setErrorFirst] = useState(false)
    const [errorSecond, setErrorSecond] = useState(false)

    const token = localStorage.getItem("auth-token");
    const handleOldPassword = (e) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_API_KEY}/check_actual_password`, {
            passwordToCheck: oldPassword
        } , {
            headers: {'auth-token': token}
        })
        .then(() => setIsCorrect(true), setErrorFirst(false), setOldPassword(''))
        .catch(err => {
            err.response.data && setErrorFirst(err.response.data)
        })     
    }

    const handleNewPassword = (e) => {
        e.preventDefault()
        axios.put('http://localhost:5000/change_user_password', {
            newPassword: newPassword
        } , {
            headers: {'auth-token': token}
        })
        .then(() => history.push('/home'), setErrorSecond(false))
        .catch(err => {
            err.response.data && setErrorSecond(err.response.data)
        })
    }

    return (
        <div className="settings">
            <Navbar />
            <div className="settings-box">
                <LeftBar />
                <div className="settings-password">
                    <div>
                        <h1>Change password</h1>
                        {errorFirst ? <h4 className='login-password-errorOne'>{errorFirst}</h4> : ""}
                        <form className='settings-firstForm' onSubmit={handleOldPassword}>
                            <div>
                                <label htmlFor="password">Current password:</label>
                                <input type="password" id='password' value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
                            </div>
                            <Button type="submit">Check</Button>
                        </form>
                        {errorSecond ? <h4 className='login-password-errorTwo'>{errorSecond}</h4> : ""}
                        {isCorrect ? (
                            <form className='settings-firstForm' onSubmit={handleNewPassword}>
                                <div>
                                    <label htmlFor="newpassword">New password:</label>
                                    <input type="password" id='newpassword' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                                </div>
                                <Button type="submit">Confirm</Button>
                            </form>
                        ) : (<h3>Please first verify your password</h3>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
