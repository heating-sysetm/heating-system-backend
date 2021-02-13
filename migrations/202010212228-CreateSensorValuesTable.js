"sensor-values strict";
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.createTable("SensorValues", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.UUID,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        allowNull: false,
        type: sequelize.STRING,
      },
      deviceCode: {
        allowNull: false,
        type: sequelize.STRING,
      },
      outTemperature: {
        type: sequelize.FLOAT,
      },
      outHumidity: {
        type: sequelize.FLOAT,
      },
      outPutTemperature: {
        type: sequelize.FLOAT,
      },
      inPutTemperature: {
        type: sequelize.FLOAT,
      },
      boiler1: {
        type: sequelize.FLOAT,
      },
      boiler2: {
        type: sequelize.FLOAT,
      },
      boiler3: {
        type: sequelize.FLOAT,
      },
      boiler4: {
        type: sequelize.FLOAT,
      },
      cistern: {
        type: sequelize.FLOAT,
      },
      gasSensor1: {
        type: sequelize.FLOAT,
      },
      gasSensor2: {
        type: sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },
  down: (queryInterface, sequelize) => {
    return queryInterface.dropTable("SensorValues");
  },
};
