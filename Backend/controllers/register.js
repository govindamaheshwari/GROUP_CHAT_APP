const Users=require('../models/users');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

exports.register= async (req,res,next)=>{
    const {name,email,phone,password}=req.body;
    let passres;
    try {
        passres=await bcrypt.hash(password,10);
        const user=await Users.findOne({where:{email:email}});
        if(user){
            return  res.status(200).json({success:false,message:'User already exists. Please login!'}) 
        }
        else{
            await  Users.create({name:name,email:email,phone:phone,password:passres});
            return res.json({success:true,message:'Successfully signed up. Please login now!'})
        }

    } catch (error) {
        res.json({success:false,message:"Some Error Occured",error:error});
    }
};


exports.login = async (req,res,next)=>{
    const {email, password}=req.body;
    try {
        const user=await  Users.findOne({where:{email:email}}); 
        if(!user){
            return res.status(404).json({success:false,message:'User does not exist!'});
        }
        const passwordCheck=await bcrypt.compare(password,user.password);

        if(!passwordCheck){
            return res.status(401).json({success:false,message:' Password does not match !'})
        }

        const token=jwt.sign({id:user.id},`${process.env.TOKEN_SECRET}`);
        return res.status(200).json({token:token,success:true,message:'Successfully logged in!'})
        
    }
    catch (error) {
        return res.json(error);
        console.log(error);
    }   
}