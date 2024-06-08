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
    const public_id = (await cloudinary.uploader.upload(imagePath)).public_id;
    return public_id;
  } catch (error) {
    fs.unlink(imagePath, (error) => console.log("There was an error while uploading the file."));
  }
};

module.exports = uploadAnImage;
