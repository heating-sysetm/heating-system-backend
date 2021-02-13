"use strict";
module.exports = (sequelize, DataTypes) => {
  var SensorValue = sequelize.define("SensorValue", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    deviceCode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    outTemperature: {
      type: DataTypes.FLOAT,
    },
    outHumidity: {
      type: DataTypes.FLOAT,
    },
    outPutTemperature: {
      type: DataTypes.FLOAT,
    },
    inPutTemperature: {
      type: DataTypes.FLOAT,
    },
    boiler1: {
      type: DataTypes.FLOAT,
    },
    boiler2: {
      type: DataTypes.FLOAT,
    },
    boiler3: {
      type: DataTypes.FLOAT,
    },
    boiler4: {
      type: DataTypes.FLOAT,
    },
    cistern: {
      type: DataTypes.FLOAT,
    },
    gasSensor1: {
      type: DataTypes.FLOAT,
    },
    gasSensor2: {
      type: DataTypes.FLOAT,
    },
  });
  return SensorValue;
};
