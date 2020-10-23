"use strict";
module.exports = (sequelize, DataTypes) => {
  var Temperature = sequelize.define("Temperature", {
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
  return Temperature;
};
