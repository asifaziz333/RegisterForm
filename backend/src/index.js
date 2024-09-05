require('dotenv').config();
const express=require('express');
const cors=require('cors')
const connectDb=require('./utils/db')
const userrouter=require('./router/userRoute')
const app=express();
app.use(cors());
const port=process.env.PORT || 4000;
app.use(express.json());
app.use('/api/user',userrouter)
connectDb().then(()=>{
    app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
})