const multer = require("multer");
const path=require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'userImage') {
        cb(null, path.join(__dirname, '../Uploads/userImage'));
      }
      else if(file.fieldname=='userDocs') {
        cb(null, path.join(__dirname, '../Uploads/userDocs'));
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
    if (file.fieldname === "userImage") {
      (file.mimetype === 'image/jpeg'
        || file.mimetype === 'image/png')
        ? cb(null, true)
        : cb(null, false);
    }
    else if (file.fieldname === "userDocs") {
      (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpeg')
        ? cb(null, true)
        : cb(null, false);
    }
  }
  
  const kycUpload = multer({
    storage: storage,
    fileFilter: fileFilter
  }).fields([{ name: 'userImage', maxCount: 1 }, { name: 'userDocs', maxCount: 2 }]);

  module.exports={kycUpload}