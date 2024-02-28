//for uploading all photos or files.
const multer = require("multer");
const path=require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'mechanicImage') {
      cb(null, path.join(__dirname, '../Uploads/mechanicImage'));
    }
    else if(file.fieldname=='mechanicIdenty') {
      cb(null, path.join(__dirname, '../Uploads/mechanicIdenty'));
    }
    else{
      cb(console.error());
    }
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "mechanicImage") {
    (file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png')
      ? cb(null, true)
      : cb(null, false);
  }
  else if (file.fieldname === "mechanicIdenty") {
    (file.mimetype === 'image/png'
      || file.mimetype === 'image/jpeg')
      ? cb(null, true)
      : cb(null, false);
  }
}

const mechanicUpload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([{ name: 'mechanicIdenty', maxCount: 1 }, { name: 'mechanicImage', maxCount: 2 }]);



module.exports={mechanicUpload}