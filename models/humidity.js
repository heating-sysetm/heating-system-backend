"use strict";
module.exports = (sequelize, DataTypes) => {
  var Humidity = sequelize.define("Humidity", {
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
    code: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    data: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  });
  return Humidity;
};
