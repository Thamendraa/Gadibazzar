const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const Cars = db.cars;


//rendering the main landing page
exports.landing = async (req, res) => {
    res.render("home",{css:"home.css"});
};

//rendering the sellCar page
exports.renderAddCar = async (req,res) => {
    res.render("sellCar",
    {css:"sellCar.css"});
};

//post sell car

exports.addCar = async (req, res) => {
    const { brand, model, model_year, 
            transmission_type, registration_state,
            fuel_type,odometer,engine_description,
            ownership,seat_number,price,
            car_img,doc_img
            } = req.body;

    const create = await Cars.create({
        brand, model, model_year, 
        transmission_type, registration_state,
        fuel_type,odometer,engine_description,
        ownership,seat_number,price,
        car_img: "http://localhost:4001/" + req.file.filename,
        doc_img: "http://localhost:4001/" + req.file.filename,
      userId: req.user.id,
    });
    res.redirect("home");
  };
  
  