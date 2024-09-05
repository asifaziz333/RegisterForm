const User=require('../models/user')
const bcrypt=require('bcrypt');

const register=async(req,res)=>{
    try{
        console.log(req.body);
        
        const{fname,lname,email,password,phone}=req.body;
        const isExist=await User.findOne({email})
        if(isExist){
           return res.status(401).send({"message":"Email Already Exists"})
        }
        const user=new User({
            fname,lname,email,password,phone
        })
        const data=await user.save();
        res.status(201).json({data})
    }catch(err){
        res.status(501).send("Internal Error")
    }
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        console.log(user);
        
        if(!user){
            return res.status(401).send({"message":"Invalid Email or Password"})
            }
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(401).send({"message":"Invalid Email or Password"})
                }
                const token=await user.generateToken()
                res.status(200).json({user,token})
        }catch(err){
                    res.status(501).send("Internal Error")
                    }
}
const userData=async(req,res)=>{
    const _id=req.params.id;
    try{
        const response=await User.find({_id})
        res.status(200).send(response)
}catch(err){
    res.status(401).send("Internal Error")
}
}
module.exports={register,login,userData}