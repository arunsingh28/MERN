require('dotenv').config()
const express = require('express')


const app = express()


// body parser
app.use(express.json())

const auth = require('./routes/auth')


const connectDB = require('./config/db')


connectDB()


app.use('/api/auth',auth)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT,console.log(`Server is up on port${PORT}`))


process.on("unhandledRejection",(err,promise)=>{
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})
