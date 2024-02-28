// Import required modules
const dbConfig = require("../Config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// Create a new Sequelize instance and establish a connection to the database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Create an object to hold Sequelize and sequelize instances
const db = {};

// Attach Sequelize and sequelize instances to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define the "user" model using the userModel.js file and associate it with Sequelize
db.user = require("./userModel.js")(sequelize, DataTypes);
db.cars = require("./sellCarModel.js")(sequelize, DataTypes);
db.kyc = require("./kycVerified.js")(sequelize,DataTypes);
db.bridge = require("./imageAccess.js")(sequelize,DataTypes);
db.inspection_appointment = require("./inspectionRequest.js")(sequelize,DataTypes)






//admin side
db.mechanices = require("./mechanics.js")(sequelize,DataTypes);



//relationship for user and kyc
db.user.hasOne(db.kyc)
db.kyc.belongsTo(db.user)

// relationship between user and postCars
db.user.hasMany(db.cars)
db.cars.belongsTo(db.user)


db.user.hasMany(db.bridge)
db.bridge.belongsTo(db.user)

db.cars.hasMany(db.bridge)
db.bridge.belongsTo(db.cars)

//relationship for request inspection
    db.cars.hasOne( db.inspection_appointment);
    db.inspection_appointment.belongsTo(db.cars);

    db.inspection_appointment.belongsTo(db.user, { foreignKey: 'userId', allowNull: true });

// Define the association between User and Mechanic
db.user.hasOne(db.mechanices);
db.mechanices.belongsTo(db.user);




// Export the db object 
module.exports = db;
