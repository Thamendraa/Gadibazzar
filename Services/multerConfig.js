//for uploading all photos or files.
const multer = require("multer");
const path=require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'carImages') {
      cb(null, path.join(__dirname, '../Uploads/carsOnSell'));
    }
    else if(file.fieldname=='carDocsImages') {
      cb(null, path.join(__dirname, '../Uploads/carsDocs'));
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
  if (file.fieldname === "carImages") {
    (file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png')
      ? cb(null, true)
      : cb(null, false);
  }
  else if (file.fieldname === "carDocsImages") {
    (file.mimetype === 'image/png'
      || file.mimetype === 'image/jpeg')
      ? cb(null, true)
      : cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([{ name: 'carDocsImages', maxCount: 2 }, { name: 'carImages', maxCount: 3 }]);



module.exports={upload}