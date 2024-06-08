const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config({ path: "./backend/config/config.env" });

cloudinary.config({
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

const uploadAnImage = async (imagePath) => {
  try {
    const response = await cloudinary.uploader.upload(imagePath);
    fs.unlink(imagePath);
    return response.public_id;
  } catch (error) {
    fs.unlink(imagePath, (error) => console.log(error));
  }
};

module.exports = uploadAnImage;
