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
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
  return Home;
};
