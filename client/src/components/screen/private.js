import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Private = ({ history }) => {
    const [error, setError] = useState('')
    const [privateDate, setPrivateData] = useState('')
    const [user, setUser] = useState([])

    const emoji = [' 😎',' 👽',' 🥶',' 😃',' 😷',' 👻',' 👋',' 🧑‍💻',' 🧚',' 👩‍🚀',' 🤏']
    useEffect(() => {
        document.title = user.map(i => i.username + emoji[Math.floor(Math.random()* emoji.length)] )

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            };

            try {
                const { data } = await axios.get('/api/private', config)
                setPrivateData(data.data)
                setUser([data.user])
            } catch (error) {
                localStorage.removeItem('authToken')
                setError('You are not Authorize please login first.')
            }
        }
        fetchPrivateData()
    },[emoji])

    const logout = () => {
        localStorage.removeItem('authToken')
        history.push('/login')
    }
    return error ? (
        <div className="jumbotron container">{error}</div>)
        : (
            <>
                { privateDate}
                {
                    user.map(name => {
                        return (
                            <h1 key={name._id}>{name.username}</h1>
                        )
                    })
                }
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
        )
}

export default Private
