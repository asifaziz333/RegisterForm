import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/register.css'
const Register=()=>{
    const[data,setData]=useState({
        fname:"",
        lname:"",
        email:"",
        password:"",
        repassword:"",
        phone:""
    })
    const[errors,setErrors]=useState({})

    const validate = () => {
        const newErrors = {};
    
        // Name validation (max 20 characters)
        if (data.fname.length > 20 || data.fname.length<3) {
          newErrors.fname = "First Name must be 20 characters or less and more than 3 charcater.";
        }
        
        if (data.lname.length > 20 || data.lname.length<3) {
            newErrors.lname = "Last Name must be 20 characters or less and more than 3 charcater.";
          }

        // phone validation (exactly 10 digits)
        if (data.phone.length !== 10 || isNaN(data.phone)) {
          newErrors.phone = "phone must be exactly 10 digits.";
        }
    
        //email validation 
     
        const match=(data.email).lastIndexOf('@gmail.com');
        if (match !== data.email.length-10) {
          newErrors.email = "Email must be valid format";
          }
        // Password validation (1 capital letter, 1 small letter, 1 special character, minimum 6 characters)
        let hasUpperCase = false;
        let hasLowerCase = false;
        let hasSpecialCharacter = false;
        let validPasswordLength = data.password.length >= 6;
        let firstCap=false;
       if(data.password.charAt(0)===0){
        firstCap=true;
       }
    
        for (let char of data.password) {
          if (char >= 'A' && char <= 'Z') hasUpperCase = true;
          if (char >= 'a' && char <= 'z') hasLowerCase = true;
          if ("@#$%&".includes(char)) hasSpecialCharacter = true;
        }
    
        if (!firstCap || !hasUpperCase || !hasLowerCase || !hasSpecialCharacter || !validPasswordLength) {
          newErrors.password =
            "Password must contain at least 1 capital letter, 1 small letter, 1 special character, and be at least 6 characters long.";
        }
        if(data.password!==data.repassword){
            newErrors.passwordMatch="Password and Confirm Password must be same";
        }
    
        setErrors(newErrors);
        console.log(newErrors);
        
        return Object.keys(newErrors).length === 0;
      };
    

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
    }
    const reset=()=>{

        setData({
            fname:"",
            lname:"",
            email:"",
            password:"",
            repassword:"",
            phone:""
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();

        if (validate()) {
            console.log("Form submitted successfully", data);
            const{fname,lname,email,password,phone}=data;
            try{
              const response=await fetch(`http://localhost:4000/api/user/register`,{
               method:'POST',
                headers:{
                    "Content-Type":"application/Json"
                },
                body:JSON.stringify({fname,lname,email,password,phone})
            })           
            
            const result=await response.json();
            console.log(response);
             console.log(result);  
             if(!response.ok){
              alert(result.message)
             }else{
              navigate('/login')
             }
          }catch(err){
            console.log(err);
          }
          } 
         
    }
    return(
        <>
        <h2>Register Form</h2>
        <form>
            <div className='input'>
        <input type='text' placeholder='Enter First Name' id='fname' name='fname' value={data.fname} style={{marginRight:"5px"}} onChange={handleData} minLength={3} maxLength={20} required/>
        <input type='text' placeholder='Enter Last Name' id='lname' name='lname' value={data.lname} onChange={handleData} minLength={3} maxLength={20} required/><br/>
  </div>
        {errors.fname && <span className='error'>{errors.fname}</span>}
        {errors.lname && <span className='error'>{errors.lname}</span>}
        <div className='input'>
        <input type='email' placeholder='Enter Email' id='email' name='email' value={data.email} onChange={handleData} minLength={3} maxLength={30} required/><br/>
        </div>
        {errors.email && <span className='error'>{errors.email}</span>}
        <div className='input'>
        <input type='password' placeholder='Enter Password' id='password' style={{marginRight:"5px"}} name='password' minLength={3} maxLength={20} value={data.password} onChange={handleData} required/>
        <input type='password' placeholder='Confirm Password' id='repassword' name='repassword' value={data.repassword} onChange={handleData} required/><br/>
      </div>
      
      {errors.password && <span className='error'>{errors.password}</span>}
      {errors.passwordMatch && <span className='error'>{errors.passwordMatch}</span>}
        <div className='input'> 
            <input type='text' placeholder='Enter Phone phone' id='phone' name='phone'  maxLength={10} value={data.phone} onChange={handleData} required/><br/>
       </div>
      {errors.phone && <span className='error'>{errors.phone}</span>}
       <div className='input'>
       <input type='button' value="Submit" onClick={handleSubmit} style={{cursor:"pointer",margin:"0 5px 15px 0"}}/>
       <input type='reset' value="Reset" onClick={reset} style={{cursor:"pointer",marginBottom:"15px"}}/>
       </div>
        </form>
        </>
    )
}

export default Register