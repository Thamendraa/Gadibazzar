const {check}= require('express-validator')

module.exports = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email."),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required.")
    .bail()
    .isLength({ min: 8, max: 12 })
    .withMessage("Password must be between 8 and 12 characters."),

];