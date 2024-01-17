const express = require('express');
const uc = require("./Controller/userController");
const hc = require("./Controller/mainController")
const db = require("./Model/index");

// Creating an Express Router
const router = express.Router();

// Landing page route (GET)
router.get('/', hc.landing);

// User registration page route (GET)
router.get("/userRegistration", uc.renderRegistration);

// Login page route (GET)
router.get("/login", uc.renderLogin);

// User registration form submission route (POST)
router.post("/userRegistration", uc.registerUser);

// Login form submission route (POST)
router.post("/login", uc.userLogin);

// Check email page route (GET)
router.get("/checkEmail", uc.renderEmail);

// Check email form submission route (POST)
router.post("/checkEmail", uc.checkEmail);

// OTP (One-Time Password) verification route (POST)
router.post("/otpCheck", uc.otpVerify);


// Exporting the router for use in other files
module.exports = router;
