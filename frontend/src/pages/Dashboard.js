import React,{useState} from 'react'
import Layout from '../components/layout/layout.js'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

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
  <div className="flex-row">
      <div className="flex-col border border-dark rounded text-center">
        <p className="list-item">
        <NavLink to="/dashboard/general" >General</NavLink>
        </p>
        <p className="list-item">
        <NavLink to="/dashboard/my-list">My List</NavLink>
        </p>
      </div>
      
      <div className="flex-col">
        <img src={require("./images/profilePic.jpg")} alt="Female profile picture."/>
        
      </div>
    </div>
    {user.role==="admin"?(<>
    
    </>):(<h2>User Page</h2>)}
  </Layout>
</>
}

export default Dashboard