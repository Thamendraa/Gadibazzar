const { validationResult } = require("express-validator");
const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const Cars = db.cars;
const User = db.user;
const Bridge = db.bridge;
const KYC = db.kyc;
const Appointment = db.inspection_appointment;
const { QueryTypes, where } = require('sequelize');



















//rendering the main landing page
exports.landing = async (req, res) => {
  
  const userId = req.user.id;
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;
  const cars = await Cars.findAll(where(userId!=db.cars.userId)
  );  //get all car data from database
  console.log(user);
  res.render("home", { css: "home.css", user: user, cars ,isKycVerified:isKycVerified});
};
exports.renderMainPage = async (req, res) => {
  
  const userId = req.user.id;
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;
  const cars = await Cars.findAll();  //get all car data from database
  console.log(user);
  res.render("home", { css: "home.css", user: user, cars ,isKycVerified:isKycVerified});
};

//rendering the sellCar page
exports.renderAddCar = async (req, res) => {
  

  //kyc validater
  const userId = req.user.id;
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  const isKycVerified = user.kyc && user.kyc.verified;
  const validationErrors = req.session.validationErrors;
  const formData = req.session.formData;
  delete req.session.validationErrors
  delete req.session.formData
  res.render("sellCar",
    {
      css: "home.css",
      user: user,
      validationErrors: validationErrors,
      formData: formData,
      isKycVerified:isKycVerified
    });
};

exports.sellCar = async (req, res) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    req.session.validationErrors = error.mapped()
    console.log(error.mapped())
    req.session.formData = req.body
    res.redirect('/sellcar')
  }
  else {

    try {
      const {
        brand, model, model_year,
        transmission_type, registration_state,
        fuel_type, odometer, engine_description,
        ownership, seat_number, price
      } = req.body;
      console.log(req.body)

      console.log(req.files)

      if (req.files) {
        const carImages =  req.files.carImages.map(file => "http://localhost:4001/carsOnSell/" +file.filename).join(',');
        const carDocsImages = "http://localhost:4001/carsDocs/" + req.files.carDocsImages[0].filename;

        const car = await Cars.create({
          brand, model, model_year,
          transmission_type, registration_state,
          fuel_type, odometer, engine_description,
          ownership, seat_number, price,
          carImages,
          carDocsImages,
          userId: req.user.id,
        });
        req.flash('success', `Car Sucessfully Posted.`);
        res.redirect("/myCarlist/:id")
      } else {
        console.log("Please select images")
        res.redirect("/sellCar")
      }

      ;
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
};

//***********************************************View A Car*********************************** */
exports.renderViewCar = async (req, res) => {
  
  const car = await Cars.findByPk(req.params.id);
  const message = req.flash()
  const userId = req.user.id;
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified

  const isKycVerified = user.kyc && user.kyc.verified;
  console.log(car)
  res.render("singleCarView", {
   message:message,
    css: "home.css",
    user: user,
    car: car,
    isKycVerified:isKycVerified,
  });
};


//profile page render*************************************************************

  exports.renderProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId)
      // Fetch the user including KYC details from the database
      const user = await db.user.findByPk(userId, {
        include: [{ model: db.kyc }]
      });
  
      // Check if KYC details exist and if KYC is verified
      const isKycVerified = user.kyc && user.kyc.verified;
      
      // Pass the user object and KYC verification status to the rendering
      res.render("profile", { css: "home.css", user: user, isKycVerified: isKycVerified, active:"Profile"});
    } catch (error) {
      console.error("Error fetching user with KYC details:", error);
      res.status(500).send("Internal Server Error");
    }
  };


//myCars render*******************************************************************
exports.renderMyCarsList = async (req, res) => {
  
  const message = req.flash()
  const userId = req.user.id;
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;

  const myCars = await db.cars.findAll({
    where: {
      userId: req.user.id,
    },
  });
  console.log(isKycVerified)
  res.render("myCarsList", { css: "home.css", user: user, myCars , message: message,isKycVerified:isKycVerified, active:"My Cars"});
};

//********************************************RequestDocs********************************** */
//renderRequested user for seller
// exports.renderUserRequestDocs = async (req, res) => {
//   const userId = req.user.id;
//   const user = await db.user.findByPk(userId, {
//     include: [{ model: db.kyc }]
//   });
//   // Check if KYC details exist and if KYC is verified
//   const isKycVerified = user.kyc && user.kyc.verified;

   
//   try {
//     // Check if there's a Car associated with the user's session userId
//     const car = await Cars.findOne({ where: { userId: userId } });

//     if (car) {
//       // If there's a car, find all corresponding Bridge entries
//       const bridges = await Bridge.findAll({ where: { carId: car.id } });

//       if (bridges && bridges.length > 0) {
//         // Extract user IDs from bridges
//         const userIds = bridges.map(bridge => bridge.userId);

//         // Find all KYC details for users associated with the extracted user IDs
//         const requestedUsers = await KYC.findAll({ where: { userId: userIds } });
        
//         console.log(requestedUsers); 
//         // Render the template with requestedUsers if there are any, otherwise, render without the table
//         res.render("userRequestDocs", { user: user, requestedUsers: requestedUsers,isKycVerified:isKycVerified,active:"Request for Document"});
//       } else {
//         console.log("No bridges found for carId:", car.id);
//         res.status(404).send("No bridges found for car");
//       }
//     } else {
//       console.log("Car not found for userId:", userId);
      
//       res.status(404).send("Car not found for user");
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   }
// };














 
//renderMyRequest Car Docs
exports.renderMyRequest = async (req, res) => {
  const userId = req.user.id;
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;

  const myRequests = await Bridge.findAll({
    where: { userId: userId},
    include: {
      model: Cars
    }
  });
  res.render("myRequest",{ user: user,myRequests:myRequests,isKycVerified:isKycVerified,active:"My Request Document"})
 console.log(myRequests)
};

//Make Request for documents
exports.makeRequest = async (req, res) => {
  const user = req.user;
  const car = await Cars.findByPk(req.params.carId);
  const userId = req.user.id; 
  const carId = req.params.carId;

  try {

    // Check if the user's KYC is verified
    const kycRecord = await KYC.findOne({ where: { userId: userId, verified: 'verified' } });

    if (!kycRecord) {
      // If KYC is not verified, send an error response
      req.flash('failure', 'please fill KYC Form ');
      return res.redirect(`/singleCarView/${user, carId}`)
    }
    // Create a new record in the bridges table
    const newBridge = await Bridge.create({
      userId: userId, 
      carId: carId
    });

    console.log(`New record inserted for userId: ${userId} and carId: ${carId}`);
    req.flash('success', `Document Request Send Sucessfully.`);
    res.redirect(`/singleCarView/${user, carId}`);
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).send('Error submitting access request');
  }
};

//Response to the request
// Assuming you have imported your models as `Bridge` and `KYC`

exports.responseRequest = async (req, res) => {
  const user = req.user.id;
  const requestedUserId = req.params.userId;
  //render

  //update access
  try {
    //render

    // Check if there's a KYC entry for the requested user
    const kyc = await KYC.findOne({ where: { userId: requestedUserId } });

    if (kyc) {
      // Update document_access status in the Bridge table
      const updatedBridge = await Bridge.update(
        { document_access: 'granted' }, // Update the status to approved, change as needed
        { where: { userId: requestedUserId } } // Match the KYC userId with the Bridge userId
      );
      res.redirect(`/userRequestDocs/${user}`);

    } else {
      console.log('No KYC entry found for the requested user');
      res.status(404).send('No KYC entry found for the requested user');
    }
  } catch (error) {
    console.error('Error updating document access status:', error);
    res.status(500).send('Error updating document access status');
  }
};


//*****************************************SellerProfile*********************** */
exports.renderSellerProfile = async (req, res) => {
 
  try {
   
    const userId = req.user.id;
    const user = await db.user.findByPk(userId, {
      include: [{ model: db.kyc }]
    });
    // Check if KYC details exist and if KYC is verified
    const isKycVerified = user.kyc && user.kyc.verified;
    const seller = await db.sequelize.query(
      "SELECT kycs.* FROM kycs JOIN cars ON kycs.userId = cars.userId WHERE kycs.userId = :userId;",
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );

    // Log seller details
    console.log(seller[0]);

    // Render the view, passing seller object to the template
    res.render("sellerProfile", { css: "home.css", user: user, seller: seller[0] ,isKycVerified:isKycVerified});
  } catch (error) {
    console.error("Error fetching seller details:", error);
    // Handle error appropriately
    res.status(500).send("Internal Server Error");
  }
};

//******************Display docs*************** */

exports.renderDisplayDocuments= async(req,res) =>{
  const userId = req.user.id;
  const carId = req.params.id;
  console.log(userId,carId)
  //Kyc verified check
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;

  const documentAccess = await db.bridge.findOne({
    where: {
      userId: userId,
      carId: carId,
      document_access: "granted" // Assuming this is the column indicating access granted
    }
  });

  if(documentAccess){
    const car = await db.cars.findByPk(carId);

    res.render("displayDocuments",{  user: user,isKycVerified:isKycVerified ,car:car});
  }
  else{
    res.redirect("displayDocuments",{user: user,isKycVerified:isKycVerified})
  }

  }
  ;





/**********************************Request for Car Inspection************************** */

exports.renderMakeInspectionRequestForm = async(req,res) => {
  const userId = req.user.id;
  //Kyc verified check
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;
  
  const carId = req.params.id;

  const myCar = await Cars.findByPk(carId);
  
  res.render("makeRequestInspectionForm",{user:user,isKycVerified:isKycVerified,active:"My Cars",myCar:myCar});
}

// **************** Make Inspection request ****************************

exports.makeInspectionRequest = async (req,res) =>{
 const userId = req.user.id;

 const {
        current_city,prefed_date,phone_number,address,carId
} = req.body;
console.log(req.body)
  const Apointment = await Appointment.create({
    current_city,
    prefed_date,
    phone_number,address,
    carId
  });
  res.redirect("/myCarlist/:id")
}