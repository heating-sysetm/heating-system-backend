"user strict";
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.createTable("Schedules", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
      },
      startDate: {
        allowNull: false,
        type: sequelize.DATE,
      },
      startTime: {
        allowNull: false,
        type: sequelize.STRING,
      },
      endDate: {
        allowNull: false,
        type: sequelize.DATE,
      },
      endTime: {
        allowNull: false,
        type: sequelize.STRING,
      },

      boyler: {
        allowNull: false,
        type: sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: sequelize.BOOLEAN,
      },
      homeId: {
        allowNull: false,
        type: sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
    });
  },
  down: (queryInterface, sequelize) => {
    return queryInterface.dropTable("Schedules");
  },
};
