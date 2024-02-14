module.exports = (sequelize, DataTypes) => {
    const Cars = sequelize.define("cars", {
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model_year:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      transmission_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      registration_state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fuel_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      odometer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      engine_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownership: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      seat_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      carImages: {
        type: DataTypes.STRING, // Define ARRAY of STRINGs
        allowNull: false, // Allow null as cars might not have images initially
      },
      carDocsImages: {
        type: DataTypes.STRING, // Define ARRAY of STRINGs
        allowNull: false, // Allow null as cars might not have documents initially
      }
    });
    return Cars;
  };