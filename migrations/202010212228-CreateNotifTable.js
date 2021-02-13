"alert strict";
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.createTable("Notifs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
      },
      title: {
        allowNull: false,
        type: sequelize. STRING,
      },
      msg: {
        allowNull: false,
        type: sequelize. STRING,
      },
      homeId: {
        allowNull: false,
        type: sequelize.STRING,
      },
      isRead: {
        allowNull: false,
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize. DATE,
      },

    });
  },
  down: (queryInterface, sequelize) => {
    return queryInterface.dropTable("Notifs");
  },
};
