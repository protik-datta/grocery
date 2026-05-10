const cloudinary = require("../config/cloudinary.config");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer, folder = "grocery") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error(
      `[Cloudinary] Failed to delete asset "${publicId}":`,
      err.message,
    );
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
