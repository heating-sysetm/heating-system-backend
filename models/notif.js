"use strict";
module.exports = (sequelize, DataTypes) => {
  var notif = sequelize.define("Notif", {
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
    msg: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    homeId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isRead:{
        allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue:false
      },
  });
  return notif;
};
