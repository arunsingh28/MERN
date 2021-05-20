const express = require('express')
const { profile } = require('../controller/private')
const { protect } = require('../middleware/protect')


const router = express.Router()

router.route('/').get(protect, profile)

module.exports = router