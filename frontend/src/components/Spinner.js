import React from 'react'
import { useNavigate } from 'react-router-dom'

const Spinner = ()=>{
  const navigate = useNavigate()
  setTimeout(()=>{
    navigate("/login")
  }, 2000)
  return <div className="d-flex spinner flex-column justify-content-center align-items-center">
    <div className="spinner-border" role="status">
  </div>
  </div>
}
export default Spinner