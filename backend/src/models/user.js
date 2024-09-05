const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    }
})
userSchema.pre("save",async function(next){
    const user=this;
    if(!user.isModified("password")){
        next();
    }
    try{
     //   const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(user.password,10);
        user.password=hashedPassword;
        next();
    }catch(err){
        next(err);
    }
})


userSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            userId:this._id.toString(),
            name:this.name,
            email:this.email,
            isAdmin:this.isAdmin,
        },
       `${process.env.JWT_SECRET_KEY}`,
        {
            expiresIn:'30d'

        }
    );
   
    }catch(err){
        console.log(err);
    }
}

const User=new mongoose.model("user",userSchema)
module.exports=User