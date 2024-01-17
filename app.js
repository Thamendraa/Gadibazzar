const express = require("express");
const app = express();
const port = 4001;
const uc = require("./Controller/userController");
const hc = require("./Controller/mainController")
const db = require("./Model/index");
const path = require("path");
const { storage, blogStorage, multer } = require("./Services/multerConfig");
const upload = multer({ storage: storage });
const uploadBlog = multer({ storage: blogStorage });
// const isAuthenticated = require("./Middleware/isAuthenticated");
const dotenv = require("dotenv");
const session = require("express-session");
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync({ force: true }); //datbabase link

dotenv.config();
// app.use(require("cookie-parser")());



//for users
app.get("/userRegistration", uc.renderRegistration);
app.get("/login", uc.renderLogin);
app.post("/userRegistration", uc.registerUser);
app.post("/login",uc.userLogin);
app.get("/checkEmail", uc.renderEmail);
app.post("/checkEmail", uc.checkEmail);
app.post("/otpcheck", uc.otpVerify);
app.get('/', uc.landing);


//starting the server
app.listen(port, () => console.log(`Server running on http://localhost:4001`))