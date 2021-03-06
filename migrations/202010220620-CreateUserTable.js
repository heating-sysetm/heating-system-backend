"user strict";
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: sequelize.STRING,
      },
      username: {
        allowNull: false,
        type: sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: sequelize.STRING,
      },
      isAdmin: {
        allowNull: false,
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      sendSMS: {
        allowNull: false,
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      phone: {
        allowNull: false,
        type: sequelize.STRING,
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
    return queryInterface.dropTable("Users");
  },
};
