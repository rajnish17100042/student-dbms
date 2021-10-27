const multer = require("multer");
const path = require("path");

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

// initialise upload resume middleware
const uploadResume = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, //1 MB
  fileFilter: (req, file, cb) => {
    checkFileTypeResume(file, cb);
  },
}).single("myResume");

// creating function to check the file type of resume
const checkFileTypeResume = (file, cb) => {
  //allowed type
  const filetypes = /pdf/; //regular expression
  //check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime type
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error:Only Pdfs are allowed!");
  }
};

module.exports = uploadResume;
