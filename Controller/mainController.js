const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const Cars = db.cars;
const  User = db.user;

//rendering the main landing page
exports.landing = async (req, res) => {
    const user=req.user;
    const cars= await  Cars.findAll();  //get all car data from database
    console.log(user);
    res.render("home",{css:"home.css",user:user,cars});
};

//rendering the sellCar page
exports.renderAddCar = async (req,res) => {
    const user = req.user
    res.render("sellCar",
    {css:"home.css",
      user:user});
};

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
      const carImages= "http://localhost:4001/carsOnSell/" + req.files.carImages[0].filename;
      const carDocsImages= "http://localhost:4001/carsDocs/" + req.files.carDocsImages[0].filename;

      const car = await Cars.create({
        brand, model, model_year,
        transmission_type, registration_state,
        fuel_type, odometer, engine_description,
        ownership, seat_number, price,
        carImages,
        carDocsImages,
        userId: req.user.id,
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
  
//***********************************************View A Car*********************************** */
exports.renderViewCar= async (req, res) => {
  const user=req.user;
  const car=  await Cars.findByPk(req.params.id); 
 
  console.log(car)
  res.render("singleCarView",{css:"home.css",user:user,car:car});
};

  
//profile page render*************************************************************
exports.renderProfile = async (req, res) => {
  const user=req.user;
 
  res.render("profile",{css:"home.css",user:user});
};

//myCars render*******************************************************************
exports.renderMyCarsList = async(req,res)=>{
  const user=req.user;
  const myCar = await db.cars.findAll({
    where: {
      userId: req.user.id,
    },
  });
  res.render("myCarsList",{css:"home.css",user:user,myCar:myCar});
};

//********************************************RequestDocs********************************** */
exports.renderUserRequestDocs = async(req,res)=>{
  const user=req.user;
  res.render("userRequestDocs",{css:"home.css",user:user});
};

//Make Request for documents
exports.makeRequest =async (req,res)=> {
  
};

//*****************************************SellerProfile*********************** */
exports.renderSellerProfile = async(req,res)=>{
  const user=req.user;
  const id = req.params.userId;
  console.log(id)
  const seller = await db.kyc.findAll({
    where: {
      userId: id,
    },
  });

  res.render("sellerProfile",{css:"home.css",user:user,seller});
};

