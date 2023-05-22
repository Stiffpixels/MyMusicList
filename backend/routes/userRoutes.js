const express = require('express')
const { addUser } = require('../controllers/userController')

const router = express.Router()

router.route('/register').post(addUser)

module.exports = router