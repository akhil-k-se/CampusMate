const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "students", // Folder name in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png"], // Supported image formats
    },
});

const upload = multer({ storage });

module.exports = upload;
