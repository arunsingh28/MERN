const ErrorResponse = require('../utils/errorResponse')


const handleError = (err, req, res, next) => {
    let error = { ...err }

    error.message = error.message

    
    console.log(err)

    if(err.code === 11000){
        const message = "Duplicate value"
        error = new ErrorResponse(message, 400)
    }

    if(err.name === 'validationError'){
        const message = Object.values(err.error).map((val)=>val.message)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success : false,
        error: error.message || 'server Error'
    })
}

module.exports = handleError