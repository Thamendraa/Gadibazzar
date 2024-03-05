const { name } = require("ejs");
const bcrypt = require("bcryptjs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const KYC = db.kyc;
const Appointment = db.inspection_appointment;
const Cars = db.cars
const Users = db.user
const sendEmail = require("../Services/sendEmail");
const { where } = require("sequelize");

//render DashBoard
exports.renderMechanicDashboard = async(req,res) =>{
  const mechanicId = req.user.id;
  const user = await db.user.findByPk(mechanicId, {
    include: [{ model: db.mechanices }]
  });  
    console.log(user)
    res.render("mechanicDashboard",{user:user,active:"Dashboard"});
  }
  
//request for Inspections

// exports.renderMechanicListOfInspections = async(req,res) =>{
//   const mechaicId = req.user.id;
//   const appointments = await Appointment.findAll({
//     where: {
//       current_city: 'Biratnagar'
//     }
//   });
//    const avaibilityCity = await db.mechanices.findOne({
//     attributes: ['avaibilityCity'],
//     where :{
//       userId: mechaicId
//     }
//    })
//      console.log(avaibilityCity)
 


//   res.render("mechanicListofInspection", { active: "Inspection List", appointments });

// }

exports.renderMechanicListOfInspections = async (req, res) => {
  const mechanicId = req.user.id;

  const user = await db.user.findByPk(mechanicId, {
    include: [{ model: db.mechanices }]
  }); 

  // Retrieve the mechanic's availability city
  const mechanicCity = await db.mechanices.findOne({
    attributes: ['avaibilityCity'],
    where: {
      userId: mechanicId
    }
  });

  if (!mechanicCity) {
    // Handle the case where mechanic is not found
    return res.status(404).send("Mechanic not found");
  }

  // Now find all appointments in the availability city
  const appointments = await db.inspection_appointment.findAll({
    where: {

      current_city: mechanicCity.avaibilityCity
    },
    include: [
      {
        model: db.cars,
        required: true // Ensure that there's a matching car for the appointment
      }
    ]
  });

  console.log(appointments);

  res.render("mechanicListofInspection", { user:user,active: "Inspection List", appointments });
};


/*********************Accpect Inspection Request*************** */

// exports.accpectInspectionRequest = async (req, res) => {
//   const mechanicId = req.user.id;
//   const carId = req.params.carId;

//   try {
//     // Find the mechanic's table ID based on the userId
//     const mechanic = await db.mechanices.findOne({
//       where: {
//         userId: mechanicId
//       }
//     });

//     if (!mechanic) {
//       // Mechanic not found
//       return res.status(404).send("Mechanic not found");
//     }

//     // Update the inspection_Appointment table
//     const [updatedRows] = await A.update(
//       { mechanicId: mechanic.id }, // Update with mechanic's table ID
//       {
//         where: {
//           carId: carId
//         }
//       }
//     );

//     if (updatedRows > 0) {
//       console.log("Inspection appointment updated successfully");
//       res.status(200).send("Inspection appointment updated successfully");
//     } else {
//       console.log("No inspection appointment found for the specified car ID");
//       res.status(404).send("No inspection appointment found for the specified car ID");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }


exports.accpectInspectionRequest = async (req, res) => {
  const mechanicId = req.user.id;
  const carId = req.params.carId;
 
 
    // Update userId and inspection_request fields
    const [updatedRows] = await Appointment.update(
      { userId: mechanicId, inspection_request: 'accepted' }, 
      {
        where: {
          carId: carId
        }
      }
    );
    // Fetch the user ID associated with the car
  const car = await Cars.findOne({
    attributes: ['userId'], // Assuming userId is the attribute name storing the owner's ID
    where: {
      id: carId
    }
  });
 
  // Fetch the email address of the user
  if (car && car.userId) {
    const user = await Users.findByPk(car.userId);
    console.log(user)
    if (user && user.email) {
      // Send email to the owner of the car
      const message = 'Your inspection request has been accepted.';

      await sendEmail({
        to: user.email,
        text: message,
        subject: " Mechanic Accepted Inspection Request",
      });
      
    }
  }


    res.redirect("/mechanicListofInspection");
}



/***Inspection report */

exports.rendermechanicInspetionReport = async(req,res) =>{
  const mechanicId = req.user.id;
  const user = await db.user.findByPk(mechanicId, {
    include: [{ model: db.mechanices }]
  });  
  res.render("mechanicInspectionReport",{user:user,active:"Inspection Report"});
}