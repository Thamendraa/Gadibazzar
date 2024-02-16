const express = require('express');
const uc = require("../Controller/userController");
const hc = require("../Controller/mainController")
const ad = require("../Controller/adminController")
const router = express.Router();
// creating for add car image and car docs
const isAuthenticated = require("../Middleware/isAuthenticated");
const { upload } = require("../Services/multerConfig");
const{ kycUpload } = require("../Services/kycMulter")
// Landing page route (GET)
router.get('/', isAuthenticated.isAuthenticated,hc.landing);

// User registration page route
router.route("/singUpUser").get(uc.renderRegistration).post(uc.registerUser)

// User login page route 

router.route("/login").get(uc.renderLogin).post(uc.userLogin);//RESTfull API

// Check email page route 
router.route("/checkEmail").get(uc.renderEmail).post(uc.checkEmail)


// OTP (One-Time Password) verification route (POST)
router.route("/otpCheck").get(uc.renderOtpCheck).post( uc.otpVerify);

//LogOut
router.route("/logout").get(uc.makeLogout)
router.route("/resetPassword").get(uc.renderResetPassword).post(uc.resetPassword)
//Route addCar(sellCar)
router.route("/sellCar")
  .get(isAuthenticated.isAuthenticated,hc.renderAddCar)
.post(upload,isAuthenticated.isAuthenticated,hc.sellCar)

//Profile
router.route("/profile").get(isAuthenticated.isAuthenticated,hc.renderProfile)

//KYC
router.route("/kyc").get(isAuthenticated.isAuthenticated,uc.renderKYC)
.post(kycUpload,isAuthenticated.isAuthenticated, uc.kycRegister)

//myCarList
router.route("/myCarlist/:id").get(isAuthenticated.isAuthenticated,hc.renderMyCarsList)

//requestDocs
router.route("/userRequestDocs").get(isAuthenticated.isAuthenticated,hc.renderUserRequestDocs)

//viewSingleCar
router.route("/singleCarView/:id").get(isAuthenticated.isAuthenticated,hc.renderViewCar)//

//view seller details
router.route('/sellerProfile/:userId').get(isAuthenticated.isAuthenticated,hc.renderSellerProfile)

//************************************************ADMIN************************************** */
router.route("/admin").get(ad.renderAdminHome)
router.route("/verifyKyc").get(ad.verifyKYC)
router.route("/viewKycDetails/:id").get(ad.renderViewKYCDetails)
router.route("/updateKycRequest/:id").post(ad.updateRequest)






module.exports = router;
