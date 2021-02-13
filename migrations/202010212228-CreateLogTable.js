"alert strict";
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.createTable("Logs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      title: {
        allowNull: false,
        type: sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: sequelize.STRING,
      },
    });
  },
  down: (queryInterface, sequelize) => {
    return queryInterface.dropTable("Logs");
  },
};
