const express=require('express');
const router=express.Router();

const authController=require('../controllers/authController');
const {loginValidator,signupValidator}=require('../validators/authValidator');


router.post('/login',loginValidator,authController.login);
router.post('/register',signupValidator,authController.register);

module.exports=router;
