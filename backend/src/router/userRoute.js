const user=require('../controller/userController')
const express=require('express')
const router=express.Router();
router.route('/register').post(user.register)
router.route('/login').post(user.login)
router.route("/userdata/:id").get(user.userData)
module.exports=router