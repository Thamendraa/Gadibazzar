const { name } = require("ejs");
const bcrypt = require("bcryptjs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const KYC = db.kyc;
const Mechanic = db.mechanices;
const USER = db.user;

//render Dashboard
exports.renderIndex = async(req,res) =>{
    res.render("index",{active:"Dashboard"});
  }
  
//rendering the main landing page
exports.renderAdminHome = async (req, res) => {
    //get all car data from database
    res.render("admin",);
};

//
exports.verifyKYC = async(req,res)=>{
    const kyc= await  KYC.findAll(); 
    console.log(kyc) 
    res.render("verifyKyc",{kyc:kyc,active:"Kyc Request"});
}    

//viewKYCDetails
exports.renderViewKYCDetails = async(req,res)=>{
    const kyc=  await KYC.findByPk(req.params.id); 
   console.log(kyc)
    res.render("viewKycDetails",{kyc:kyc});
}    

//updateKYC
exports.updateRequest = async (req, res) => {
    try {
        const kyc = await KYC.findByPk(req.params.id);
        // await kyc.update({ verified: 'verified' });
        kyc.verified='verified'
        kyc.save()
        res.redirect('/admin');
    } 
    catch (error) {
        console.error('Error updating verification status:', error);
        res.status(500).send('Internal Server Error');
    }
};

/*********Render Mechanics list****************** */
exports.renderMechanics = async (req,res)=>{
    const mechanics = await Mechanic.findAll();
  
    res.render("adminMechanicList",{mechanics:mechanics,active:"Mechanics"})
}

/******************************Render Add Mechanics************** */

exports.renderAddMechanics = async (req,res)=>{
    res.render("adminAddMechanics",{active:"Mechanics"})
}

/****************Add Mechanics************ */

// exports.addMechanics = async (req,res) =>{
//     const{
//         full_name,age,gender,address,phone_number,exprience_year,
//         avaibilityCity,avaibilityTime,email,password
//          }=req.body;
//          console.log(req.body)
//          if(req.files){
//             const mechanicImage = "http://localhost:4001/mechanicImage/" + req.files.mechanicImage[0].filename;
//             const mechanicIdenty = "http://localhost:4001/mechanicIndenty/" + req.files.mechanicIdenty[0].filename;
            
//             const addMechanic = await Mechanic.create({
//                 full_name,age,gender,address,phone_number,exprience_year,
//                 avaibilityCity,avaibilityTime,email,
//                 password: bcrypt.hashSync(password, 10),
//                 mechanicIdenty,mechanicImage
//             })

//             res.redirect("/adminMechanicList")
//          }
// }
exports.addMechanics = async (req, res) => {
    const { full_name, age, gender, address, phone_number, exprience_year,
             avaibilityCity, avaibilityTime, email, password } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      // Add mechanic credentials to the user table
      const newUser = await USER.create({
        name: full_name,
        email,
        gender,
        password: hashedPassword,
        role: 'mechanic'
      });
      
      if(req.files){
                 const mechanicImage = "http://localhost:4001/mechanicImage/" + req.files.mechanicImage[0].filename;
                const mechanicIdenty = "http://localhost:4001/mechanicIndenty/" + req.files.mechanicIdenty[0].filename;
      // Add mechanic details to the mechanic table with the userId as foreign key
      const mechanic = await Mechanic.create({
        full_name,
        age,
        gender,
        address,
        phone_number,
        exprience_year,
        avaibilityCity,
        avaibilityTime,
        email,
        mechanicIdenty,mechanicImage,
        password: hashedPassword, // Use the hashed password
        userId: newUser.id // Assign the userId as the foreign key
      });
  
      req.flash('success', 'Mechanic registered successfully.');
      res.redirect('/adminMechanicList');
     } // Redirect to mechanic list page after registration
    } catch (error) {
      console.error("Error registering mechanic:", error);
      req.flash('failure', 'Error registering mechanic.');
      res.redirect('/renderAddMechanics'); // Redirect to add mechanic page in case of error
    }
  };
  