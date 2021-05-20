import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Private = () => {
    const [error, setError] = useState('')
    const [privateDate, setPrivateData] = useState('')
    const history = useHistory()
    useEffect(() => {
        document.title = 'Private route'

        if (localStorage.getItem('authToken')) {
            history.push('/login')
        }
        const fetchPrivateData = async () => {
            const config = {
                header: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            }

            try {
                const { data } = await axios.get('/api/private', config)
                setPrivateData(data.data)
            } catch (error) {
                localStorage.removeItem('authToken')
                setError('You are not Authorize please login first.')
            }
        }
        fetchPrivateData()
    }, [history])

    const logout = () => {
        localStorage.removeItem('authToken')
        history.push('/login')
    }
    return (
        <>
            {error ? { error } : (
                <>
                    { privateDate}
                    <button className="btn btn-primary" onClick={logout}>Logout</button>
                </>
            )}
        </>
    )
}

export default Private
