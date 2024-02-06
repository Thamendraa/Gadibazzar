const express = require('express');
const uc = require("../Controller/userController");
const hc = require("../Controller/mainController")
// const multerConfig = require("../Services/multerConfig");
// Creating an Express Router
const router = express.Router();
// creating for add car image and car docs
// const carImgUpload = multerConfig.multer({ storage: multerConfig.carImgStorage });
// const docsOfCarUpload = multerConfig.multer({ storage: multerConfig.docsOfCar });
const { upload } = require("../Services/multerConfig");

// Landing page route (GET)
router.get('/', hc.landing);

// User registration page route
router.route("/singUpUser").get(uc.renderRegistration).post(uc.registerUser)

// User login page route 

router.route("/login").get(uc.renderLogin).post(uc.userLogin);//RESTfull API

// Check email page route 
router.route("/checkEmail").get(uc.renderEmail).post(uc.checkEmail)


// OTP (One-Time Password) verification route (POST)
router.route("/otpCheck").get(uc.renderOtpCheck).post( uc.otpVerify);

router.route("/resetPassword").get(uc.renderResetPassword).post(uc.resetPassword)
//Route addCar(sellCar)
router.route("/sellCar")
  .get(hc.renderAddCar)
.post(upload,hc.sellCar)
// router.route("/sellCar").post(docsOfCarUpload.single("carDocsImage"),hc.sellCar)
// Exporting the router for use in other files
module.exports = router;
