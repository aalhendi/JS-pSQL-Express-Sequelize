/* Imports */
const multer = require("multer");

/* Multer */
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

exports.upload = multer({ storage });
