import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const[user,setUser]=useState([])
  const id=JSON.parse(localStorage.getItem("userId"))
      
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem("token")
        if(!auth){
            navigate('/register')
        }
     getData();

    },[])
    const getData=async()=>{
      const response=await fetch(`http://localhost:4000/api/user/userdata/${id}`,{
        method:'GET'
      })
      const data=await response.json();
     //console.log(data);  
      setUser(data[0])
    }
    console.log(user);
    const del=()=>{}
  return (
    <div>
      <h2>User Data</h2>
      
      <table border={1}>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>{user.fname}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
            <button>Update</button>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Home
