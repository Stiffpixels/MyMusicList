const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEMail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const fs = require("fs");
const music = require("../models/musicModel");
const uploadImage = require("../utils/cloudinary.js");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorHandler("This email is already in use.", 500);
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
    },
  });

  const VerificationToken = user.getResetPasswordToken(true);

  user.verificationToken = VerificationToken;

  await user.save({ validateBeforeSave: false });
  const verificationURL = `${req.protocol}://${req.get("host")}/verification/${VerificationToken}`;
  const message = `your account verification link :- \n\n ${verificationURL}  if you have not made account creation request on MyMusicList, please ignore it`;
  try {
    sendEMail({
      email: user.email,
      subject: "MyMusicList email verification",
      message,
    });
    res.status(200).json({
      success: true,
      message: "A verification link has been sent to your email id.",
    });
  } catch (err) {
    user.verificationToken = undefined;

    await user.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    success: false,
    message: "Some error occured",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    throw new ErrorHandler("Please enter email and password", 400);
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ErrorHandler("Invalid email or password", 400);
  }
  if (user.active === false) {
    throw new ErrorHandler("Please verify your email before logging in", 400);
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new ErrorHandler("Invalid email or password");
  }

  sendToken(user, 200, res);
};

const verifyUser = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    throw new ErrorHandler("No user found for that verification link please try again", 404);
  }
  user.active = true;

  await user.save();
  res.status(200).json({
    success: true,
  });
};

const logoutUser = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new ErrorHandler("No user with that email", 404);
  }

  const resetToken = user.getResetPasswordToken(false);

  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `your password reset link :- \n\n ${resetPasswordUrl} valid for 15 minutes if you have not made request to reset your password, someone else is trying to reset your password so please ignore this email`;
  try {
    sendEMail({
      email: user.email,
      subject: "MyMusicList password reset",
      message,
    });
    res.status(200).json({
      success: true,
      message: "A reset password link has been sent to your email id.",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
  }
};

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

  if (!user) {
    throw new ErrorHandler("Reset password token is invalid or is expired", 500);
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ErrorHandler("Both the Passwords entered do not match", 500);
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};

const getUserDetails = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.status(200).json({
    success: true,
    user,
  });
};

const getUsers = async (req, res) => {
  const { id } = req.query;
  let users;
  if (id) {
    users = await User.findOne({ _id: id });
    if (!users) {
      throw new ErrorHandler("user with given id does not exists", 500);
    }
  } else {
    users = await User.find();
  }

  res.status(200).json({
    success: true,
    users,
  });
};

const updateUserPassword = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.currentPassword);

  if (!isPasswordMatched) {
    throw new ErrorHandler("Current Password and entered password does not match", 500);
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ErrorHandler("Both the Passwords entered do not match", 500);
  }

  user.password = req.body.password;

  await user.save();

  sendToken(user, 200, res);
};

const updateUserDetails = async (req, res) => {
  if (req.body.name) {
    req.user.name = req.body.name;
  }
  if (req.body.email) {
    req.user.email = req.body.email;
  }
  if (req.file) {
    req.user.avatar.public_id = await uploadImage(req.file.path);
  }
  await req.user.save();

  sendToken(req.user, 200, res);
};

const addToList = async (req, res) => {
  const { albumId, listName, rating } = req.body;
  const user = req.user;
  let Rating = 0;
  const album = await music.findById(albumId);
  if (user.musicList[listName].includes(album)) {
    throw new ErrorHandler("This album is already in your list", 500);
  }

  if (rating) {
    Rating = rating;
  }

  album.numOfReviews += 1;
  album.reviews.push({ user: user._id, rating: Rating, name: user.name });

  album.rating = (album.rating + rating) / album.numOfReviews;

  album.save();

  user.musicList[listName].push(album);
  user.save();
  res.status(200).json({
    success: true,
  });
};

const updateList = async (req, res) => {
  const { albumId, listName, rating, comment, updatedList } = req.query;
  const user = req.user;
  let prevReview = {};
  const qString = {};

  if (!user.musicList[listName].includes(albumId)) {
    throw new ErrorHandler("Album is not in your list", 404);
  }

  const album = await music.findById(albumId);

  album.reviews.map((review, index) => {
    if (review.user == user.id) {
      prevReview = album.reviews[index];
      album.reviews.splice(index);
    }
  });

  qString.user = user.id;
  qString.name = user.name;

  if (rating !== "null") {
    qString.rating = rating;
  }
  if (comment) {
    qString.comment = comment;
  }
  if (updatedList) {
    console.log(updatedList);
    user.musicList[listName].pop(albumId);
    user.musicList[updatedList].push(albumId);
    await user.save();
  }
  album.reviews.push({ ...prevReview._doc, ...qString });
  let albumRating = 0;
  album.reviews.map((review) => {
    albumRating += review.rating;
  });
  album.rating = albumRating / album.numOfReviews;

  album.save();
  res.status(200).json({
    success: "true",
  });
};

const deleteFromList = async (req, res) => {
  const { listName, albumId } = req.query;
  const user = req.user;

  if (!user.musicList[listName].includes(albumId)) {
    throw new ErrorHandler("Album is not in your list", 404);
  }

  const album = await music.findById(albumId);

  album.reviews.map((review, index) => {
    if (review.user == user.id) {
      album.reviews.splice(index);
    }
  });

  album.numOfReviews -= album.numOfReviews === 0 ? 0 : album.numOfReviews - 1;

  let albumRating = 0;
  album.reviews.map((review) => {
    albumRating += review.rating;
  });
  album.rating = albumRating / album.numOfReviews;

  user.musicList[listName].map((curr, index) => {
    if (curr.toString() === albumId) {
      user.musicList[listName].splice(index, 1);
    }
  });

  await album.save({ validateBeforeSave: false });
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Album deleted successfully",
  });
};

const getUserList = async (req, res) => {
  const { list } = req.query;

  const List = await music.find({ _id: { $in: req.user.musicList[list] } });

  res.status(200).json({
    success: true,
    List,
  });
};

const updateUserRoles = async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    throw new ErrorHandler("please enter a valid id", 500);
  }

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (role) {
    user.role = role;
  }

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ErrorHandler("please enter a valid id", 500);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
};

module.exports = {
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
};
