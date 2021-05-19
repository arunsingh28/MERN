const express = require('express')
const protection = require('../middleware/protect')

const { profile } = require('../controller/private')

const router = express.Router()

router.route('/').get(protection,profile)

module.exports = router