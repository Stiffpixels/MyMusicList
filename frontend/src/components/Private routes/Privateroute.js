import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth.js'
import Spinner from '../Spinner.js'

const Privateroute = ()=>{
  const [auth, setAuth] = useAuth()
  return auth.user===false? <Spinner /> : <Outlet />
}

export default Privateroute