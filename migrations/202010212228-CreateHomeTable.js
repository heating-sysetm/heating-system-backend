"home strict";
module.exports = {
    up:(queryInterface,sequelize) =>{
        return queryInterface.createTable('Homes',{
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
            
            deviceCode: {
                allowNull: false,
                type: sequelize.STRING,
              },

            url:{
                allowNull:false,
                type:sequelize. STRING
            },
            port:{
                allowNull:false,
                type:sequelize. INTEGER
            },
            max:{
                allowNull:false,
                type:sequelize. INTEGER
            },
            createdAt:{
                allowNull:false,
                type:sequelize. DATE
            },
            updatedAt:{
                allowNull:false,
                type:sequelize. DATE
            },
        });
    },
    down: (queryInterface,sequelize) =>{
        return queryInterface.dropTable('Homes');
    }
};
