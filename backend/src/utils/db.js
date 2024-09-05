const mongoose=require('mongoose');
const connectDb=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/lko");
        console.log("Database Connected Successful");
    }catch(err){
        console.log("connection fail");
    }
}
module.exports=connectDb;