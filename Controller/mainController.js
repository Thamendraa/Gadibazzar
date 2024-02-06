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

// exports.sellCar = async (req, res) => {
//   try {
//     const {
//       brand, model, model_year, 
//       transmission_type, registration_state,
//       fuel_type, odometer, engine_description,
//       ownership, seat_number, price,carImage,carDocsImage
//     } = req.body;

//     console.log(req.body);

//     const car = await Cars.create({
//       brand, model, model_year,
//       transmission_type, registration_state,
//       fuel_type, odometer, engine_description,
//       ownership, seat_number, price,
//       carImage: "http://localhost:4001/Uploads/carsOnSell/" + req.files.filename,
//       carDocsImage: "http://localhost:4001/Uploads/carsDocs/" + req.files.filename,
      
//     });

//     res.redirect("home");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };

exports.sellCar = async (req, res) => {
  try {
    const {
      brand, model, model_year, 
      transmission_type, registration_state,
      fuel_type, odometer, engine_description,
      ownership, seat_number, price
    } = req.body;
    console.log(req.body)

    console.log(req.files)

    if(req.files){
      const carImage= "http://localhost:4001/carsOnSell/" + req.files.carImage[0].filename;
      const carDocsImage= "http://localhost:4001/carsDocs/" + req.files.carDocsImage[0].filename;

      const car = await Cars.create({
        brand, model, model_year,
        transmission_type, registration_state,
        fuel_type, odometer, engine_description,
        ownership, seat_number, price,
        carImage,
        carDocsImage
      });
  
      res.redirect("/")
    }else{
      console.log("Please select images")
      res.redirect("/sellCar")
    }

;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

  
  