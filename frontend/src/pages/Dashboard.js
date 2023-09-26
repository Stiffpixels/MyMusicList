import React from 'react'
import Layout from '../components/layout/layout.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = ()=>{
  const navigate = useNavigate()
  let user = {}
  const renderDashboard= async ()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, { withCredentials:true})
      if(res.data.success){
        user = res.data.user
        console.log('its true')
      }
    }catch(error){
      console.log(error)
      navigate('/login')
    }
  }
  renderDashboard()
  return(<>
    {user==={}?(
    <div className="spinner">
    <div className=" spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
</div>):(
    <Layout title="My Profile " description="Your profile information">
      <img src={require("./images/profilePic.jpg")} alt="image as a test" />
    </Layout>)}
    </>)
}

export default Dashboard