const _user = require('../Model/User')


exports.register = async (req, res, next) => {
    const { username, password, email } = req.body

    try {
        const user = await _user.create({
            username, password, email
        })
        return res.status(201).json({ success: true, user })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "please provide email and password" })
    }
    try {
        const user = await _user.findOne({ email }).select('+password')

        if (!user) {
            return res.status(404).json({ success: false, error: "invalid User" })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "invalid credentials" })
        }
        return res.status(200).json({ success: true, token: 'something token asdfadfad' })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}


exports.forgotpassword = (req, res, next) => {
    res.send('forgotpassword route')
}

exports.resetpassword = (req, res, next) => {
    res.send('resetpassword route')
}