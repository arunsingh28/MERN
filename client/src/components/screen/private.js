import React,{useEffect} from 'react'

const Private = () => {
    useEffect(()=>{
        document.title = 'Private route'
    })
    return (
        <div>
            private
        </div>
    )
}

export default Private
