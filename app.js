const express = require("express");
const routes = require('./Routes/routes');
const app = express();
const port = 4001;
const db = require("./Model/index");
const path = require("path");
// const isAuthenticated = require("./Middleware/isAuthenticated");
const dotenv = require("dotenv");
app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync({ force: true }); //datbabase link

dotenv.config();
// app.use(require("cookie-parser")());



// Use the routes defined in the separate module
app.use('/', routes);


//starting the server
app.listen(port, () => console.log(`Server running on http://localhost:4001`))