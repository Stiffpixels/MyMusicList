const express = require('express')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, path.join(__dirname, '/uploads/'))
  },
  filename:function (req, file, cb){
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname) )
  }
})
const upload = multer({storage})

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUsers, getUserDetails, updateUserPassword, updateUserDetails, updateUserRoles, deleteUser, addToList, getUserList } = require('../controllers/userController')

const { isAuthorizedUser, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post( loginUser )
router.route('/logout').get( logoutUser )

router.route('/me').get(isAuthorizedUser, getUserDetails)

router.route('/password/reset').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/update/password').post(isAuthorizedUser, updateUserPassword)
router.route('/update/details').put(isAuthorizedUser,upload.single("profile_pic"), updateUserDetails)
router.route('/admin/user/:id').put(isAuthorizedUser, authorizeRoles('admin'), updateUserRoles ).delete(isAuthorizedUser, authorizeRoles('admin'), deleteUser )

router.route('/list').get(isAuthorizedUser, getUserList)

router.route('/add/tolist').put(isAuthorizedUser, addToList)

router.route('/admin/users').get(isAuthorizedUser, authorizeRoles('admin'), getUsers)

module.exports = router