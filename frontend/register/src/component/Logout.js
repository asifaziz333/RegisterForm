import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        const auth=localStorage.getItem("token")
        if(!auth){
            navigate("/register")
        }
    },[])
  return (
    <div>
      <h2 >Logout</h2>
    </div>
  )
}
export default Logout
