const Users=require('../models/users');

exports.getUsers=async (req,res,next)=>{
let users;
try {
    users=await Users.findAll();
    console.log(users);
    return res.status(200).json({success:true,users:users});
} catch (error) {
    res.json(err);
}
}