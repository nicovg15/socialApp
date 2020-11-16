import React, {useState} from 'react'
import '../css/Register.css'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

function Register() {
    const history = useHistory()
    const [error, setError] = useState()
    const [registerUsers, setRegisterUsers] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })

    const {name, lastname, username, email, password} = registerUsers

    const handleOnChange = (e) => {
        setRegisterUsers({ ...registerUsers, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_KEY}/register`, registerUsers)
        .then((res) => {
            history.push('/')
        }).catch (err => {
            err.response.data.msg && setError(err.response.data.msg)
        })
    }

    return (
        <div className="register">
            <div className="register-icon-box">
            </div>
            <div className="register-container">
                {error ? <h4 className='register-error'>{error}</h4> : ""}
                <h1>Create your account</h1>
                <form onSubmit={handleOnSubmit}>
                    <input type="text" placeholder="First name" name="name" value={name} onChange={e => handleOnChange(e)}/>
                    <input type="text" placeholder="Last name" name="lastname" value={lastname} onChange={e => handleOnChange(e)}/>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={e => handleOnChange(e)}/>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={e => handleOnChange(e)}/>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={e => handleOnChange(e)}/>
                    <Button type="submit" variant="contained">Log in</Button>
                    <p>Already have an account? <Link to="/">Sign in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register
