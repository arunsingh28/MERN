import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Private = ({ history }) => {
    const [error, setError] = useState('')
    const [privateDate, setPrivateData] = useState('')

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


    return (
        <>
            {error ? { error } : { privateDate } }
        </>
    )
}

export default Private
