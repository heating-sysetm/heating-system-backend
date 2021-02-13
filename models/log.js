"use strict";
module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define("Log", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    data: {
      allowNull: false,
      type: DataTypes.STRING,
    }

  });
  return Log;
};
