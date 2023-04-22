const express=require('express');
const router=express.Router();

const registerController=require('../controllers/register');

router.post('/signup',registerController.register);
router.post('/login',registerController.login);
module.exports=router;