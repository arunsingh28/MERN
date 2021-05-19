const mongoose = require('mongoose')

module.exports = connectDB = async () => {
    await mongoose.connect(process.env.URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: true 
    })

    console.log("DB is connected")
}

