const { validationResult } = require("express-validator");
const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const USER = db.user;
const bcrypt = require("bcryptjs");
const sendEmail = require("../Services/sendEmail");
const jwt = require("jsonwebtoken");

//render singUpUser from Pages 
exports.renderRegistration = async (req, res) => {
  const title = 'Sing Up Gadibazzar'
  const validationErrors = req.session.validationErrors || [];
  const formData = req.session.formData || {};

  delete req.session.validationErrors
  delete req.session.formData
  res.render("singUpUser",
    {
      css: "login.css", title,
      validationErrors: validationErrors,
      formData: formData,
    }
  );
};

exports.renderLogin = async (req, res) => {

  const title = 'Log In Gadibazzar'
  const validationErrors = req.session.validationErrors|| [];
  const formData = req.session.formData || {};
  const message = req.flash()
  console.log(formData)

  delete req.session.validationErrors
  delete req.session.formData

  res.render("login", {
    message: message,
    validationErrors: validationErrors,
    formData: formData,
    css: 'login.css',
    title: title
  });

}

exports.renderEmail = async (req, res) => {
  res.render("checkEmail");
};

exports.renderResetPassword = async (req, res) => {
  res.render("resetPassword")
}
exports.renderOtpCheck = async (req, res) => {
  res.render("otpCheck")
}
//SingUp 
exports.registerUser = async (req, res) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    req.session.validationErrors = error.mapped()
    console.log(error.mapped())
    req.session.formData = req.body
    res.redirect('/singUpUser')
  }
  else {
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
    req.flash('success', `User register Sucessfully`);
    res.redirect(`/login`);
  }
};

//login
// exports.userLogin = async (req, res) => {
//   const error = validationResult(req)

//   if (!error.isEmpty()) {
//     req.session.validationErrors = error.mapped()
//     console.log(error.mapped())
//     req.session.formData = req.body
//     res.redirect('/login')
//   }
//   else {
//     const { email, password } = req.body;

//     const userSearch = await USER.findOne({
//       where: {
//         email: email,
//       },
//     });
//     console.log(userSearch);

//     if (userSearch == null) {
//       console.log("wrong email");
//       res.redirect("/userRegistration");
//     }
//     console.log(userSearch.password);
//     console.log(bcrypt.compareSync(password, userSearch.password));

//     if (bcrypt.compareSync(password, userSearch.password)) {
//       var token = jwt.sign({ id: userSearch.id }, process.env.SECRET_KEY, {
//         expiresIn: 86400,
//       });
//       res.cookie("token", token);
//       console.log(token)
//       res.redirect("/");

//     } else {
//       res.redirect("/login");
//       req.flash('failure','Wrong passsword.')
//       console.log("wrong password");
//     }
//   }

// };

exports.userLogin = async (req, res) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    req.session.validationErrors = error.mapped()
    console.log(error.mapped())
    req.session.formData = req.body
    res.redirect('/login')
  } else {
    const { email, password } = req.body;

    const userSearch = await USER.findOne({
      where: {
        email: email,
      },
    });
    
    if (!userSearch) {
      console.log("User not found");
      req.flash('failure', 'User not found.');
      return res.redirect("/login");
    }

    if (bcrypt.compareSync(password, userSearch.password)) {
      var token = jwt.sign({ id: userSearch.id }, process.env.SECRET_KEY, {
        expiresIn: 86400,
      });
      res.cookie("token", token);
      console.log(token);

      // Check user role and redirect accordingly
      if (userSearch.role === 'admin') {
        return res.redirect("/index");
      } else if (userSearch.role === 'mechanic') {
        return res.redirect("/mechanicDashboard");
      } else {
        return res.redirect("/");
      }
    } else {
      req.flash('failure', 'Wrong password.');
      console.log("wrong password");
      return res.redirect("/login");
    }
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
    req.session.forgotPasswordEmail = email;
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
  const email = req.session.forgotPasswordEmail;
  console.log("email:", email)

  const foundUser = await USER.findOne({
    where: {
      email: email,
    },
  });

  if (foundUser != null && foundUser.otp == otp) {
    // req.flash("success","OTP Verified Successfully.")
    res.redirect("/resetPassword");
  }
  else {
    // req.flash("failure","OTP Verification Failed !")
    res.redirect("/otpCheck")
  }
};

exports.resetPassword = async (req, res) => {
  console.log("Working in good manner")
  const { newPassword, confirmPassword } = req.body
  const email = req.session.forgotPasswordEmail;
  if (newPassword != confirmPassword) {
    // req.flash("failure","Passwords do not match !")
    res.redirect("/resetPassword")
  }
  else {
    const foundUser = await USER.findOne({
      where: {
        email: email
      }
    })
    const encPassword = bcrypt.hashSync(newPassword, 10)

    foundUser.password = encPassword;
    foundUser.otp = null;
    foundUser.save();
    delete req.session.forgotPasswordEmail;
    // req.flash('success','Password reset successful !')
    res.redirect('/login')
  }
}

//logOut
//logout
exports.makeLogout = (req, res) => {
  res.clearCookie("token");
  // req.flash("success", "Logged out successfully!");
  res.redirect("/login");
};

//**************************************KYC CONTROLLERS*************************** */
exports.renderKYC = async (req, res) => {
 
  const userId = req.user.id;
  const validationErrors = req.session.validationErrors;
  const formData = req.session.formData;

  delete req.session.validationErrors
  delete req.session.formData
  const user = await db.user.findByPk(userId, {
    include: [{ model: db.kyc }]
  });
  // Check if KYC details exist and if KYC is verified
  const isKycVerified = user.kyc && user.kyc.verified;
  res.render("kyc",
    { css: "home.css", user: user,isKycVerified:isKycVerified,validationErrors: validationErrors,
    formData: formData }
  );
};

//Post KYC
exports.kycRegister = async (req, res) => {
  const error=validationResult(req)

  if (!error.isEmpty()) {
    req.session.validationErrors = error.mapped()
    console.log(error.mapped())
    req.session.formData = req.body
    res.redirect('/kyc')
  }
  else {
  console.log(req.file);
  const {
    full_name,
    dob,
    gender,
    profession,
    phone_number,
    marital_status,
    current_address,
    permanent_address, identity_type, citizenShip_number,
    issued_district, issued_date
  } = req.body;
  console.log(req.body)
  console.log(req.user.id)
  //create table
  if (req.files) {
    const userImage = "http://localhost:4001/userImage/" + req.files.userImage[0].filename;
    const userDocs = "http://localhost:4001/userDocs/" + req.files.userDocs[0].filename;

    const createKyc = await db.kyc.create({
      full_name,
      dob,
      gender,
      profession,
      phone_number,
      marital_status,
      current_address,
      permanent_address, identity_type, citizenShip_number,
      issued_district, issued_date, userImage, userDocs,
      userId: req.user.id,
    });

    res.redirect("/profile");
  };


  }
};

/***************Update KYC************ */

exports.rendrUpdateKYC = async (req, res) => {
  const userId = req.user.id;

  const kycData = await KYC.findOne({
    where: {
      userId: userId
    },
  });
  res.render("editBlog", { kyc: kycData });
};


