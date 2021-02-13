"use strict";
module.exports = (sequelize, DataTypes) => {
  var Home = sequelize.define("Home", {
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
    deviceCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    port: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    max:{
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  });
  return Home;
};
