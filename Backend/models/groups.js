const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Groups= sequelize.define('groups',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    groupname:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    createdby:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports=Groups;