const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const USER = db.user;
const bcrypt = require("bcryptjs");
const sendEmail = require("../Services/sendEmail");


//render singUpUser from Pages 
exports.renderRegistration = async (req, res) =>
  {
    const title='Sing Up Gadibazzar'
    res.render("singUpUser",
    {css:"login.css",title}
    );
  };
  
  exports.renderLogin = async (req, res) => {
 
    const title='Log In Gadibazzar'
    res.render("login", {
      css: "login.css",
      title
    });
  };
  
  exports.renderEmail = async (req, res) => 
  {
    res.render("checkEmail");
  };
  
  exports.renderResetPassword = async(req,res) =>{
    res.render("resetPassword")
  }
  exports.renderOtpCheck = async(req,res) =>{
    res.render("otpCheck")
  }
//SingUp 
exports.registerUser = async (req, res) => {
  console.log(req.file);
  const { 
    name, 
    email, 
    gender,
    password
  } = req.body;
  console.log(req.body.password)
  //create user
  const created = await USER.create({
    name: name,
    email,
    gender,
    password: bcrypt.hashSync(password, 10),
  });

  console.log(created);
  if (created) {
    try {
      const message = "You have successfully registered.";

      await sendEmail({
        to: req.body.email,
        text: message,
        subject: "Registration Successful",
      });
    } catch (e) {
      console.log("error sending mail");
      res.render("error");
    }
  }

  res.redirect("login");
};


exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const userSearch = await USER.findAll({
    where: {
      email: email,
    },
  });
  console.log(email);

  if (userSearch.length == 0) {
    console.log("wrong email");
    res.redirect("/userRegistration");
  }
  console.log(userSearch[0].password);
  console.log(bcrypt.compareSync(password, userSearch[0].password));
  
  if (bcrypt.compareSync(password, userSearch[0].password)) {
    res.redirect("/");
  } else {
    res.redirect("/login");
    console.log("wrong password");
  }
};

//send email
exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  const findUser = await USER.findOne({
    where: {
      email: email,
    },
  });
  if (findUser && findUser != null) {
    req.session.forgotPasswordEmail=email;
    // Generates 6-digit one-time password (OTP)
    const OTP = Math.floor(100000 + Math.random() * 900000);
    const message = "Your OTP is" + OTP;

    console.log(OTP);
     // JSON to be passed as parameter for sending email
     const options = {
      to: email,
      text: message,
      subject: "For reset password",
    };

    try {
      //Function to send password reset otp via Gmail
      await sendEmail(options);

      // req.flash("success", "OTP sent successfully. Please check your email.");
      //Save the otp to the database
      findUser.otp = OTP;
      await findUser.save();

      //Redirect to the verify OTP page
      res.redirect(`/otpCheck`);
    } catch (err) {
      // req.flash("failure", "OTP could not be sent !");
      res.redirect("/checkEmail")
    }
  } else {
    // req.flash("failure", "Sorry, the provided email is not registered !");
    res.redirect("/checkEmail");
  }
};


//confroming OTP


exports.otpVerify = async (req, res) => {
  const { otp } = req.body;
  const email= req.session.forgotPasswordEmail;
  console.log("email:", email)

  const foundUser = await USER.findOne({
    where: {
      email:email,
    },
  });

  if (foundUser!=null &&foundUser.otp==otp) {
    // req.flash("success","OTP Verified Successfully.")
    res.redirect("/resetPassword");
  }
  else{
    // req.flash("failure","OTP Verification Failed !")
    res.redirect("/otpCheck")
  }
};

exports.resetPassword= async (req,res)=>{
  console.log("Working in good manner")
  const {newPassword,confirmPassword}=req.body
  const email=req.session.forgotPasswordEmail;
  if (newPassword!=confirmPassword){
    // req.flash("failure","Passwords do not match !")
    res.redirect("/resetPassword")
  }
  else{
    const foundUser= await USER.findOne({
      where:{
        email:email
      }
    })
      const encPassword=bcrypt.hashSync(newPassword,10)

      foundUser.password=encPassword;
      foundUser.otp=null;
      foundUser.save();
      delete req.session.forgotPasswordEmail;
      // req.flash('success','Password reset successful !')
      res.redirect('/login')
  }
}

// exports.landing = async (req, res) => {
//   res.render("home");
// };
