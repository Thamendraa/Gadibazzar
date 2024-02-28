const express = require("express");
const userRoutes = require('./Routes/userRoutes');
const mechanicRoutes = require('./Routes/mechanicRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const app = express();
const port = 4001;
const db = require("./Model/index");
const path = require("path");
// const isAuthenticated = require("./Middleware/isAuthenticated");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require('connect-flash');



app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views/pages'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "Uploads")));
app.use(express.json());
app.use(require("cookie-parser")());

///////////////////////////////////////for session
app.use(
    session({
      secret: "123456789",
      reSave: true,
      saveUninitialized: true,
    })
  );

  app.use(flash());
app.use(express.urlencoded({ extended: true }));

//DataBase link
db.sequelize.sync({ force: false }); 

dotenv.config();
// app.use(require("cookie-parser")());



// Use the routes defined in the separate module

//userRoutes
app.use('/', userRoutes);

//mechanicsRoutes
app.use(mechanicRoutes);

//adminRoutes
app.use(adminRoutes);




//starting the server
app.listen(port, () => console.log(`Server running on http://localhost:4001`))