const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUsers,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  updateUserRoles,
  deleteUser,
  addToList,
  getUserList,
  updateList,
  deleteFromList,
  verifyUser,
} = require("../controllers/userController");

const { isAuthorizedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthorizedUser, getUserDetails);

router.route("/password/reset").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/update/password").post(isAuthorizedUser, updateUserPassword);
router.route("/verification/:token").get(verifyUser);
router.route("/update/details").put(isAuthorizedUser, upload.single("profile_pic"), updateUserDetails);
router.route("/admin/user/:id").put(isAuthorizedUser, authorizeRoles("admin"), updateUserRoles).delete(isAuthorizedUser, authorizeRoles("admin"), deleteUser);

router.route("/list").get(isAuthorizedUser, getUserList);

router.route("/add/list").put(isAuthorizedUser, addToList);
router.route("/update/list").put(isAuthorizedUser, updateList);
router.route("/delete/list").delete(isAuthorizedUser, deleteFromList);

router.route("/admin/users").get(isAuthorizedUser, authorizeRoles("admin"), getUsers);

module.exports = router;
