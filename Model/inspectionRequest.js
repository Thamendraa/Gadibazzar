module.exports = (sequelize, DataTypes) => {
    const inspection_Apointment = sequelize.define("inspection_Apointment", {
       current_city:{
        type:DataTypes.STRING,
        allowNull:false
       },
       prefed_date:{
        type:DataTypes.STRING,
        allowNull:false
       },
       phone_number:{
        type:DataTypes.STRING,
        allowNull:false
       },
       address:{
        type:DataTypes.STRING,
        allowNull:false
       },
        inspection_request:{
            type:DataTypes.ENUM('pending', 'accepted'),
            allowNull: false,
            defaultValue:'pending',
        },
    });
    return inspection_Apointment;
  };