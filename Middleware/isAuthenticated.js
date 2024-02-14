const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const user = require("../Model/index").user;
const dotenv=require('dotenv')
dotenv.config()

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Check token in middleware",token);

  if (!token) {
    // req.flash("failure", "Authentication failed! Please do login first");
    res.redirect("/login");
  } else {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    console.log("Token id:",decoded.id)
    const findUser = await user.findOne({
      where: {
        id: decoded.id,
      },
    });
    console.log(findUser)
    if (!findUser) {
      // req.flash("failure", "User authentication failed.");
      res.redirect("/login");
    } else {
      req.user = findUser;
      next();
    }
  }
};
