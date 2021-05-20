import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = ({history}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            history.push('/')
        }
    }, [history])
    
    const handleForm = async (e) => {
        e.preventDefault()

        const config = {
            header : {
                'Content-Type': 'application/json'
            }
        }
        if(password !== confirm){
            setPassword('')
            setConfirm('')
            setTimeout(()=>{
                setError('')
            },5000)
            return setError('Password not matching')
        }

        try {
            const {data} = await axios.post('/api/auth/register',
            {username,password,email},
            config)

            localStorage.setItem('authToken',data.token)
            history.push('/login')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(()=>{
                setError('')
            },5000)
        }
    }

    return (
        <div className="card card-outline-secondary container">
            <div class="card-header">
                <h3 class="mb-0">Sign Up</h3>
            </div>
            { error && <span className="alert alert-danger mt-2">{error}</span> }
            <div className="card-body">
                <form onSubmit={handleForm}>
                    <div className="form-group mt-1">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" placeholder="username" required value={username} className="form-control" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group mt-1">
                        <label htmlFor="username">Email</label>
                        <input type="email" className="form-control" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="username">Password</label>
                        <input type="password" className="form-control" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="username">Confirm Password</label>
                        <input type="password" className="form-control" placeholder="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                    </div>

                    <div className="form-group my-3">
                        <button className="btn btn-success float-right" type="submit">Register</button>
                    </div>
                    <Link to="/login">You already have an account ?</Link>
                </form>
            </div>
        </div>
    )
}

export default Register
