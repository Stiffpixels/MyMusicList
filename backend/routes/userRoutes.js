const express = require('express')
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUsers, getUserDetails, updateUserPassword, updateUserDetails, updateUserRoles, deleteUser } = require('../controllers/userController')

const { isAuthorizedUser, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post( loginUser )
router.route('/logout').get( logoutUser )

router.route('/me').get(isAuthorizedUser, getUserDetails)

router.route('/password/reset').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/update/password').post(isAuthorizedUser, updateUserPassword)
router.route('/update/details').put(isAuthorizedUser, updateUserDetails)
router.route('/admin/user/:id').put(isAuthorizedUser, authorizeRoles('admin'), updateUserRoles ).delete(isAuthorizedUser, authorizeRoles('admin'), deleteUser )

router.route('/admin/users').get(isAuthorizedUser, authorizeRoles('admin'), getUsers)

module.exports = router