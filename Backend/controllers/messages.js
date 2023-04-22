const Users=require('../models/users');
const Messages=require('../models/messages');
const Sequelize=require('sequelize');
//const S3Services=require('../services/s3Services');
const Op=Sequelize.Op;

exports.sendMessage= async (req,res,next)=>{
    const text_message=req.body.message_text;
    const receiverid=req.body.receiverid;
    const name=req.user.name;
    try {
        await req.user.createMessage({message:text_message,receiverid:receiverid,sendername:name, isgroupmessage:true})
        return res.status(200).json({success:true,message:"Message Sent successfull"});
    } catch (error) {
        console.log(error);
        res.json(error);
    }
};

exports.getAllMessages=async (req,res,next)=>{
    const groupId=req.params.groupId
    const lastMessageId=req.query.lastMessageId;
    console.log("last Message id",lastMessageId);
    try {
        const messages=await Messages.findAll({
            where:{
                receiverid:groupId,
                id:{
                    [Op.gt]:lastMessageId
                }
            }});
            
        return res.status(200).json({success:true,message:"Message fetched successfully",messages:messages, userId:req.user.id});
    } catch (error) {
        console.log(error);
        return res.json(error);        
    }
}


