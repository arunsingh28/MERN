import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('authtoken')) {
            history.push('/')
        }
    }, [history])

    const handleForm = async (e) => {
        e.preventDefault()

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/auth/login',
                { password, email },
                config)

            localStorage.setItem('authToken', data.token)
            history.push('/login')
        } catch (error) {
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className="card card-outline-secondary container">
            <div class="card-header">
                <h3 class="mb-0">Sign Up</h3>
            </div>
            { error && <span className="alert alert-danger mt-2">{error}</span>}
            <div className="card-body">
                <form onSubmit={handleForm}>

                    <div className="form-group mt-1">
                        <label htmlFor="username">Email</label>
                        <input type="email" className="form-control" placeholder="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group mt-1">
                        <label htmlFor="username">Password</label>
                        <input type="password" className="form-control" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>


                    <div className="form-group my-3">
                        <button className="btn btn-success float-right" type="submit">Login</button>
                    </div>
                    <Link to="/register">if you don't have an account ?</Link>
                </form>
            </div>
        </div>
    )
}

export default Login
