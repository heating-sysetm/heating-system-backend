"temperature strict";
module.exports = {
    up:(queryInterface,sequelize) =>{
        return queryInterface.createTable('Humidities',{
            id:{
                allowNull:false,
                primaryKey:true,
                type:sequelize.UUID,
                defaultValue:sequelize.UUIDV4,
            },
            name:{
                allowNull:false,
                type:sequelize. STRING
            },
            createdAt:{
                allowNull:false,
                type:sequelize. DATE
            },
            updatedAt:{
                allowNull:false,
                type:sequelize. DATE
            },
            code:{
                allowNull:false,
                type:sequelize. STRING
            },
            data: {
                allowNull: false,
                type: sequelize. STRING,
              },
        });
    },
    down: (queryInterface,sequelize) =>{
        return queryInterface.dropTable('Humidities');
    }
};
