const dotenv=require('dotenv')
dotenv.config();

const express = require("express");
const bodyParser=require('body-parser');
const cors= require('cors');


const loginRoutes=require('./routes/register');
const memberRoutes=require('./routes/member');
const messageRoutes=require('./routes/messages');
const groupRoutes=require('./routes/groups');



const sequelize=require('./util/database');

const Users=require('./models/users');
const Messages=require('./models/messages');
const Groups=require('./models/groups');
const Groupmembers=require('./models/groupmembers');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use(cors({
    origin:"*"
}));
app.use(loginRoutes);
app.use(memberRoutes);
app.use(groupRoutes);
app.use(messageRoutes);
//app.use(uploadRoutes);

// Many to one between users and messages
Users.hasMany(Messages);
Messages.belongsTo(Users);

//Many to many between user and groups

Users.belongsToMany(Groups,{through: Groupmembers});
Groups.belongsToMany(Users,{through:Groupmembers});

//Many to one between Groups and Messages

//  Groups.hasMany(Messages);
//  Messages.belongsTo(Groups);

//{force:true}
sequelize
    .sync()
    .then(()=>{
        app.listen(3000);
    })
    .catch(error=>console.log(error));

