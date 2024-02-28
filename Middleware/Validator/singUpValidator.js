const {check}= require('express-validator')

module.exports = [
    check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name Required."),
     
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email."),

    check("gender")
    .not()
    .isEmpty()
    .withMessage("Please Select the Gender"),

// check("agree")
//     .not()
//     .isEmpty()
//     .withMessage("Please Agree the terms and comditions"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 8, max: 12 })
    .withMessage("Password must be between 8 and 12 characters."),

];