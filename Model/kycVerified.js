module.exports = (sequelize, DataTypes) => {
    const KYC = sequelize.define("kyc", {
    verified:{
        type:DataTypes.ENUM('Pending', 'verified'),
        allowNull: false,
        defaultValue:'Pending',
    },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender:{
        type :DataTypes.STRING,
        allowNull:false,
      },
      profession: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      marital_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      current_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      permanent_address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      identity_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      citizenShip_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true,
      },
      issued_district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      issued_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userDocs: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    return KYC;
  };