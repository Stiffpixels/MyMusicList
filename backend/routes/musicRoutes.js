const express = require("express");
const router = express.Router();
const { isAuthorizedUser, authorizeRoles } = require("../middleware/auth");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const { getmusic, musicStatic, getmusicDetail, addmusic, updatemusic, deletemusic, createUpdateReview, getTrendingMusic } = require("../controllers/musicController");

router.route("/music").get(getmusic);
router.route("/musicStatic").get(musicStatic);
router.route("/musicDetail").get(getmusicDetail);
router.route("/music/review").post(isAuthorizedUser, createUpdateReview);
router.route("/music/trending").get(getTrendingMusic);
router.route("/admin/music/new").post(isAuthorizedUser, authorizeRoles("admin"), upload.single("cover_art"), addmusic);

router.route("/admin/music/update").put(isAuthorizedUser, authorizeRoles("admin"), updatemusic);
router.route("/admin/music/delete").delete(isAuthorizedUser, authorizeRoles("admin"), deletemusic);

module.exports = router;
