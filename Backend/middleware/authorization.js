const jwt=require('jsonwebtoken');
const {json}= require('express/lib/response');

const Users=require('../models/users');

exports.authorization = async (req,res,next)=>{
    const header=req.header('Authorization');
    
    const token =header.split(" ")[1];

    try {
        const response=jwt.verify(token,`${process.env.TOKEN_SECRET}`); /// has user id and issuing time;

        const user=await Users.findOne({where:{id:response.id}});

        req.user=user;
      
        next();

    } catch (error) {
        console.log(error);
        return res.json({message:`${error}`});
    }
}