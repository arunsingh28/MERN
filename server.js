const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// body parser
app.use(express.json())

const items = require('./routes/items')

mongoose.connect(process.env.URI,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
    console.log('DB connected')
})
.catch(e => console.log(e))


app.use('/api/items', items)

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server is up on port${PORT}`))

