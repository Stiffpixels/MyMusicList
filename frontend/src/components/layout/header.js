import React from 'react'
import { NavLink, Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.js'
import axios from 'axios'
import toast from 'react-hot-toast'

import {GiDelicatePerfume, GiShoppingCart} from 'react-icons/gi'
import {FaMusic} from 'react-icons/fa'

const Header = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const handleLogout= async()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`)
      if(res.data.success){
        setAuth({...auth, user:null})
        localStorage.removeItem('auth')
        setTimeout(()=>toast.success("Logout successful"), 500)
        navigate('/')
      }
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
    
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <Link to='/' className="navbar-brand"><FaMusic/><span className="navbar-brand-title">MyMusicList</span></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/contact' className="nav-link">Contact</NavLink>
        </li>
        {(!auth.user)?(<><li className="nav-item">
          <NavLink to='/register' className="nav-link">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" >Login</NavLink>
        </li></>):(<li className="nav-item">
          <NavLink to='/' onClick={handleLogout} className="nav-link" >Logout</NavLink>
        </li>)
          
        }
        
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header