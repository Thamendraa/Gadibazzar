module.exports = (sequelize, DataTypes) => {
    const Mechanic = sequelize.define("mechanic", {
      
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          }, 
          age: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          gender:{
            type :DataTypes.STRING,
            allowNull:false,
          },
          phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          address: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          experience_year: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          mechanicImage: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          mechanicIdenty: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          avaibilityCity: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          avaibilityTime: {
            type: DataTypes.STRING,
            allowNull: false,
          }

    });
    return Mechanic;
  };