const jwt = require('jsonwebtoken')
const _user = require('../Model/User')
const ErrorResponse = require('../utils/errorResponse')

exports.protect = async (req, res, next) => {
    let token

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(new ErrorResponse("Not authoriz to access this route", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SCERT)

        const user = await _user.findById(decoded.id)

        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404))
        }
        req.user = user
        next()
    } catch (error) {
        return next(new ErrorResponse("Not authoriz to access this route", 401))
    }
}