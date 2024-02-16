const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const KYC = db.kyc;

//rendering the main landing page
exports.renderAdminHome = async (req, res) => {
    //get all car data from database
    res.render("admin",);
};

//
exports.verifyKYC = async(req,res)=>{
    
    const kyc= await  KYC.findAll(); 
    console.log(kyc) 
    res.render("verifyKyc",{kyc:kyc});
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
