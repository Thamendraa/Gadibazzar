module.exports = (sequelize, DataTypes) => {
    const Bridge = sequelize.define("bridge", {
        document_access:{
            type:DataTypes.ENUM('requested', 'granted','notGranted'),
            allowNull: false,
            defaultValue:'requested',
        },
    });
    return Bridge;
  };