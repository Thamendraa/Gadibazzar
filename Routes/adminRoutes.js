const express = require('express');
const mechanic = require("../Controller/mechanicController")
const router = express.Router();
//for vlaidators
const uc = require("../Controller/userController");
const hc = require("../Controller/mainController")
const ad = require("../Controller/adminController")

const isAuthenticated = require("../Middleware/isAuthenticated");

const{mechanicUpload} = require("../Services/addMechanicMulter")
//************************************************ADMIN************************************** */
//Dashboard

router.route ("/index").get(ad.renderIndex)

router.route("/admin").get(ad.renderAdminHome)
router.route("/verifyKyc").get(ad.verifyKYC)
router.route("/viewKycDetails/:id").get(ad.renderViewKYCDetails)
router.route("/updateKycRequest/:id").post(ad.updateRequest)

//mechanic list
router.route("/adminMechanicList").get(ad.renderMechanics);

//add amechanics
router.route("/adminAddMechanics").get(ad.renderAddMechanics)
.post(mechanicUpload,ad.addMechanics);

module.exports = router;