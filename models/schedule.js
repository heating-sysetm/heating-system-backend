"use strict";
module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define("Schedule", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    startTime: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    endTime: {
        allowNull: false,
        type: DataTypes.STRING,
      },

    boyler: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      homeId: {
        allowNull: false,
        type: DataTypes.UUID,
      },

  });
  return Schedule;
};
