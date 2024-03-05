const express = require('express');
const uc = require("../Controller/userController");
const hc = require("../Controller/mainController")


const router = express.Router();
//for vlaidators
const imageAccess = require("../Middleware/imageAccess")
const isAuthenticated = require("../Middleware/isAuthenticated");
const validateLloginUser = require("../Middleware/Validator/loginValidator")
const validateSingUpUser = require("../Middleware/Validator/singUpValidator")
const validateSellCar = require("../Middleware/Validator/sellCarValidator")
const validateKYC = require ("../Middleware/Validator/kycValidator")

// creating for add car image and car docs
const { upload } = require("../Services/multerConfig");
const{ kycUpload } = require("../Services/kycMulter")




// Landing page route (GET)
router.get('/', isAuthenticated.isAuthenticated,hc.renderMainPage);

// User registration page route
router.route("/singUpUser").get(uc.renderRegistration).post(validateSingUpUser,uc.registerUser)

// User login page route 

router.route("/login").get(uc.renderLogin).post(validateLloginUser,uc.userLogin);//RESTfull API

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
.post(upload,validateSellCar,isAuthenticated.isAuthenticated,hc.sellCar)

//Profile
router.route("/profile").get(isAuthenticated.isAuthenticated,hc.renderProfile)

//KYC
router.route("/kyc").get(isAuthenticated.isAuthenticated,uc.renderKYC)
.post(kycUpload,validateKYC,isAuthenticated.isAuthenticated, uc.kycRegister)

//myCarList
router.route("/myCarlist/:id").get(isAuthenticated.isAuthenticated,hc.renderMyCarsList)

//requestDocs
router.route("/userRequestDocs/:id").get(isAuthenticated.isAuthenticated,hc.renderUserRequestDocs)
//makerequest
router.route("/makeRequest/:carId").get(isAuthenticated.isAuthenticated,hc.makeRequest)
//responseRequest
router.route("/responseRequest/:userId").post(isAuthenticated.isAuthenticated,hc.responseRequest)

//RenderMyrequestCarDocs
router.route("/myRequest/:id").get(isAuthenticated.isAuthenticated,hc.renderMyRequest)


//viewSingleCar
router.route("/singleCarView/:id").get(isAuthenticated.isAuthenticated,hc.renderViewCar)//

//view seller details
router.route('/sellerProfile/:userId').get(isAuthenticated.isAuthenticated,hc.renderSellerProfile)

//********************Display Documents************ */
router.get(`/displayDocuments/:id`,isAuthenticated.isAuthenticated,hc.renderDisplayDocuments)

/*******************Inspection request from************* */

router.route(`/makeRequestInspectionForm/:id`)
.get(isAuthenticated.isAuthenticated,hc.renderMakeInspectionRequestForm);

router.route(`/makeRequestInspectionForm`).post(isAuthenticated.isAuthenticated,hc.makeInspectionRequest);










  module.exports = router;
