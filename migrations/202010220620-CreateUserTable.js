"user strict";
module.exports = {
    up:(queryInterface,sequelize) =>{
        return queryInterface.createTable('Users',{
            id:{
                allowNull:false,
                primaryKey:true,
                type:sequelize.UUID,
                defaultValue:sequelize.UUIDV4,
            },
            createdAt:{
                allowNull:false,
                type:sequelize. DATE
            },
            updatedAt:{
                allowNull:false,
                type:sequelize. DATE
            },
            name:{
                allowNull:false,
                type:sequelize. STRING
            },
            username: {
                allowNull: false,
                type: sequelize. STRING,
              },
              password: {
                allowNull: false,
                type: sequelize. STRING,
              },
              isAdmin: {
                allowNull: false,
                type: sequelize. BOOLEAN,
                defaultValue:false
              },
        });
    },
    down: (queryInterface,sequelize) =>{
        return queryInterface.dropTable('Users');
    }
};
