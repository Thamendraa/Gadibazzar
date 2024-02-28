const { check } = require('express-validator')

module.exports = [
   
    check("brand")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please Enter the Brand of the car."),

    check("model_year")
        .not()
        .isEmpty()
        .withMessage("Please Select the Year of the your car."),

    check("odometer")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please Enter total distance in the Odometer of the car."),

    check("price")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Please enter the price for your car.")

];