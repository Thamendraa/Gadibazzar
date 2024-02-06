//for uploading all photos or files.
const multer = require("multer");
const path=require("path")

// var carImgStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../Uploads/carsOnSell/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// var docsStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../Uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const carImgUpload = multer({ storage: carImgStorage });
// const docsOfCarUpload = multer({ storage: docsStorage });

// module.exports = {
//   multer,
//   carImgUpload,
//   docsOfCarUpload
// };


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'carImage') {
      cb(null, path.join(__dirname, '../Uploads/carsOnSell'));
    }
    else if(file.fieldname=='carDocsImage') {
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
  if (file.fieldname === "carImage") {
    (file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/png')
      ? cb(null, true)
      : cb(null, false);
  }
  else if (file.fieldname === "carDocsImage") {
    (file.mimetype === 'image/png'
      || file.mimetype === 'image/jpeg')
      ? cb(null, true)
      : cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([{ name: 'carDocsImage', maxCount: 1 }, { name: 'carImage', maxCount: 1 }]);

module.exports={upload}