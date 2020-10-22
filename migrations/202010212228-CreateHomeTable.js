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
            url:{
                allowNull:false,
                type:sequelize. STRING
            },
        });
    },
    down: (queryInterface,sequelize) =>{
        return queryInterface.dropTable('Homes');
    }
};
