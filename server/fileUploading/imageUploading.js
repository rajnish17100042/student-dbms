const multer = require("multer");
const path = require("path");
const S3 = require("aws-sdk/clients/s3");

//set storage engine for file upload in local
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// initialise upload middleware
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, //1 MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("myImage");

// creating function to check the file type
const checkFileType = (file, cb) => {
  //allowed type
  const filetypes = /jpeg|jpg|png|gif/; //regular expression
  //check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime type
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error:Only Images are alloewd!");
  }
};

module.exports = uploadImage;
