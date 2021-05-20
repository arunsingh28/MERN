const express = require('express')
const router = express.Router()

const { 
    login, 
    register, 
    resetpassword, 
    forgotpassword 
} = require('../controller/auth')

router.route('/login').post(login)

router.route('/register').post(register)

router.route('/forgotpassword').post(forgotpassword)

router.route('/resetpassword').put(resetpassword)



module.exports = router