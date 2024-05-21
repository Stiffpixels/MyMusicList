const sendToken = (user, statusCode, res) => {
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    secure: true,
    sameSite: "None",
    httpOnly: true,
  };

  const token = user.getJWTToken();

  res.cookie("token", token, options).status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
