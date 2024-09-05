import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const[data,setData]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()
    useEffect(()=>{
        const auth=localStorage.getItem("token")
        if(auth){
            navigate("/")
        }
    },[])
    const handleData=(e)=>{
        const{name,value}=e.target;
        setData({
            ...data,[name]:value
        })
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(data);  
        const response=await fetch("http://localhost:4000/api/user/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })  
        const result=await response.json();
        console.log(result); 
        if(!response.ok){
            alert(result.message)
        }else{
            localStorage.setItem("token",JSON.stringify(result.token))
            localStorage.setItem("userId",JSON.stringify(result.user._id));
            navigate('/')
        }
    };
  return (
    <>
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit} style={{height:"250px"}}>
        <div className='input'>
        <input type='email' placeholder='Enter Email' id='email' name='email' value={data.email} onChange={handleData} minLength={3} maxLength={20} required/><br/>
        </div>
        <div className='input'>
        <input type='password' placeholder='Enter Password' id='password' name='password' minLength={3} maxLength={20} value={data.password} onChange={handleData} required/>
        </div>
       <div className='input'>
       <input type='submit' value="Submit" style={{cursor:"pointer"}}/>
       </div>
       </form>
    </>
  )
}

export default Login
