import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/navbar.css'
const Navbar = () => {
  const auth=localStorage.getItem("token")  
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup');
  }
  return (
    <div>
      {
        auth ?
        <ul>
          <li>home Page</li>
          <li><Link to='/logout' className='link' onClick={logout}>Logout</Link></li>
        </ul>
        :
        <ul>
          <li>
          <Link to='/register' className='link'>Sign Up</Link>
          <Link to='/login' className='link'>Login</Link>
          </li>
        </ul>
      }
    </div>
  )
}

export default Navbar
