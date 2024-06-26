import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth.js'
import Spinner from '../Spinner.js'

const Privateroute = ()=>{
  const [auth] = useAuth()
  return auth.user===false? <Spinner Private={true} /> : <Outlet />
}

export default Privateroute