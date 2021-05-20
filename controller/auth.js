const _user = require('../Model/User')
const ErrorResponse = require('../utils/errorResponse')

exports.register = async (req, res, next) => {
    const { username, password, email } = req.body

    try {
        const user = await _user.create({
            username,
            password,
            email
        })
        // return res.status(201).json({ success: true, user })
        getToken(user, 200, res)
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        // return res.status(400).json({ success: false, error: "please provide email and password" })
        return next(new ErrorResponse("please provide email and password", 400))
    }
    try {
        const user = await _user.findOne({ email }).select('+password')

        if (!user) {
            // return res.status(401).json({ success: false, error: "invalid User" })
            return next(new ErrorResponse("Invalid User", 401))
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            // return res.status(404).json({ success: false, error: "invalid credentials" })
            return next(new ErrorResponse("Invalid Password", 401))
        }
        // return res.status(200).json({ success: true, token: 'something token asdfadfad' })
        getToken(user, 200, res)
    } catch (error) {
        next(error)
    }
}


exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body
    try {
        const user = await _user.findOne({ email })
        if (!user) {
            return next(new ErrorResponse(`Can not send mail to ${email}`, 404))
        }
        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetURI = process.env.RESET_PASSWORD_URL + '/resetpassword/' + resetToken
        const message = `
        <h1>Reset Password Link</h1>
        <p>Please go to link to reset password <p>
        <a href="${resetURI}" style={padding:5px 30px;background:lightblue;border-radius:5px} clicktracking=off>Reset Password</a>
        `
    } catch (error) {
        return next(new ErrorResponse(error, 400))
    }
}

exports.resetpassword = (req, res, next) => {
    res.send('resetpassword route')
}

const getToken = (user, statusCode, res) => {
    let token = user.getSignedToken()
    return res.status(statusCode).json({ success: true, token })
}