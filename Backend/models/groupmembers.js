const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Groupmembers= sequelize.define('groupmembers',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    isadmin:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        default:false
    }
})

module.exports=Groupmembers;