"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    sendSMS: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    phone:{
      allowNull: false,
      type: DataTypes.STRING,
    }
  });
  return User;
};
