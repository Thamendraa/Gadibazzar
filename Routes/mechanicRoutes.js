const express = require('express');
const mechanic = require("../Controller/mechanicController")
const router = express.Router();
//for vlaidators
const imageAccess = require("../Middleware/imageAccess")
const isAuthenticated = require("../Middleware/isAuthenticated");


/**************************************Mechanic******************************************** */
router.route("/mechanicDashboard").get(isAuthenticated.isAuthenticated,mechanic.renderMechanicDashboard);

//list of request for ispection
router.route("/mechanicListofInspection").get(isAuthenticated.isAuthenticated,mechanic.renderMechanicListOfInspections);

router.route("/accpectInspectionRequest/:carId").post(isAuthenticated.isAuthenticated,mechanic.accpectInspectionRequest)

//ispection report
router.route("/mechanicInspectionReport").get(isAuthenticated.isAuthenticated,mechanic.rendermechanicInspetionReport);

module.exports = router;