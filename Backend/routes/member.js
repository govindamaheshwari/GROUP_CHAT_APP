const express=require('express');
const router=express.Router();

const memberController=require('../controllers/member');

router.get('/users',memberController.getUsers);
module.exports=router;