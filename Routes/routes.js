const express = require('express');
const uc = require("../Controller/userController");
const hc = require("../Controller/mainController")


// Creating an Express Router
const router = express.Router();

// Landing page route (GET)
router.get('/', hc.landing);

// User registration page route
router.route("/singUpUser").get(uc.renderRegistration).post(uc.registerUser)

// User login page route 

router.route("/login").get(uc.renderLogin).post(uc.userLogin);//RESTfull API

// Check email page route 
router.route("/checkEmail").get(uc.renderEmail).post(uc.checkEmail)


// OTP (One-Time Password) verification route (POST)
router.post("/otpCheck", uc.otpVerify);

//Route addCar(sellCar)
router.route("/sellCar").get(hc.addCar)


// Exporting the router for use in other files
module.exports = router;
