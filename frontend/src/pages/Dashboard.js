import React,{useState} from 'react'
import Layout from '../components/layout/layout.js'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import Profmenu from "../components/Profmenu"

const Dashboard = ()=>{
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const renderDashboard= async ()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, { withCredentials:true})
      if(res.data.success){
        setUser(res.data.user)
        console.log(user)
      }
    }catch(error){
      console.log(error)
      //navigate('/login')
    }
  }
  renderDashboard()
  return <>
 <Layout title="My Profile " description="Your profile information">
    <Profmenu />
    <div class="form">
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  </Layout>
</>
}

export default Dashboard