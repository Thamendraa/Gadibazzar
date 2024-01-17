const { name } = require("ejs");
const DB = require("../Config/dbConfig");
const db = require("../Model/index");
const USER = db.user;
const bcrypt = require("bcryptjs");
const sendEmail = require("../Services/sendEmail");



exports.renderRegistration = async (req, res) => {
    res.render("userRegistration");
  };
  
//Singin
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
//login
exports.renderLogin = async (req, res) => {
  res.render("login");
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
exports.renderEmail = async (req, res) => {
  res.render("checkEmail");
};

exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  const check = await USER.findOne({
    where: {
      email: email,
    },
  });
  if (check.length != 0) {
    try {
      const randomOTP = Math.floor(100000 + Math.random() * 900000);
      const message = "Your OTP is" + randomOTP;
      await sendEmail({
        to: email,
        text: message,
        subject: "For reset password",
      });
      check.otp = randomOTP;
      await check.save();
    } catch (e) {
      console.log("error");
      res.render("error");
    }
    return res.render("otpCheck");
  }
};

//confroming OTP

exports.otpVerify = async (req, res) => {
  const { otp, newPassword } = req.body;
  const encPassword = bcrypt.hashSync(newPassword, 12);
  console.log(newPassword);
  const foundOtp = await USER.findOne({
    where: {
      otp: otp,
    },
  });
  console.log(otp);
  if (foundOtp) {
    foundOtp.password = encPassword;
    foundOtp.otp = null;
    await foundOtp.save();
  } else {
    console.log("OTP no match");
    return res.render("otpCheck");
  }
  return res.redirect("/login");
};

exports.landing = async (req, res) => {
  res.render("home");
};
