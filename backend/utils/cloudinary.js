const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "./backend/config/config.env" });

cloudinary.config({
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// const cloudinaryUpload = (req) => {
//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (error) reject(error);
//       if (result) resolve(result);
//     });
//     streamifier.createReadStream(req.file.buffer).pipe(stream);
//   });
// };

const uploadAnImage = async (file) => {
  try {
    const public_id = (await cloudinary.uploader.upload(file, { resource_type: "auto" })).public_id;
    return public_id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = uploadAnImage;
