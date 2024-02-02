//for uploading all photos or files.
const multer = require("multer");

var carImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads/carsOnSell/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var docsOfCar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads/carsDocs/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = {
  multer,
  carImgStorage,
  docsOfCar
};