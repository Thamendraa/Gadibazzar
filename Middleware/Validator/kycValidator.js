const {check}= require('express-validator')

module.exports = [
    check("full_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Name."),
 
     
  check("dob")
    .not()
    .isEmpty()
    .withMessage("Date of Birth Required."),
   

   
    check("phone_number")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .bail()
    .isLength({ min: 10, max: 10 })
    .withMessage("Invalid Number."),




check("current_address")
.trim()
.not()
.isEmpty()
.withMessage("Please Enter Current Address."),

  check("permanent_address")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Enter Current Address."),
   
    check("citizenShip_number")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Please Enter Your Citizenship Number."),

    check("issued_district")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Issued District Required."),


    check("issued_date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Issued Date is required.")
    .bail()
    .isDate()
    .withMessage("Please Enter Valid Date."),

];