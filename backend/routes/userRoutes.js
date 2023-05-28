const express = require('express')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword } = require('../controllers/userController')

const { isAuthorizedUser } = require('../middleware/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post( loginUser )
router.route('/logout').get( logoutUser )
router.route('/me').get(isAuthorizedUser, getUserDetails)
router.route('/password/reset').post(forgotPassword)
router.route('/updatePassword').post(isAuthorizedUser, updateUserPassword)
router.route('/password/reset/:token').put(resetPassword)

module.exports = router