import React,{useState, useEffect } from 'react'
import Layout from '../components/layout/layout.js'
import axios from 'axios'
import Profmenu from "../components/Profmenu"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Dashboard = ()=>{
  const [user, setUser] = useState({})
  const navigate = useNavigate
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    toast.success(`Name: ${name} Email: ${email}`)
  }

  useEffect(()=>{
    const asyncFunc = async ()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, { withCredentials:true})
        if(res.data.success){
          setUser(res.data.user)
          console.log(user)
        }
      }catch(error){
        console.log(error)
    }
    }
    asyncFunc()
  }, [])
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  return <>
 <Layout title="My Profile " description="Your profile information">
    <Profmenu />
    <div className="form-container" style={{width:"100%", margin:'0'}}>
    <section className='form profile-container' >
    <div className="profile-image"><img src={require('./images/profilePic.jpg')} alt="female profile picture" /></div>
    
    <div className="profile-details">
      <p className='profile-text' >{user.name}</p>
      <p className='profile-text' >{user.email}</p>
    </div>

    </section>
    </div>
    <div className="form-container" style={{width:'100%', margin:'0', marginBottom:'3em'}}>
    <form className='form' onSubmit={e=>handleSubmit(e)}>
    <h3 style={{textTransform:"uppercase"}}>Edit Profile</h3>
    <p className="form-field">
      <label htmlFor="name" className="field-text profile-field-text"  >Name: </label>
      <input className='field-input' value={name} type="name" name='name' id='name' onChange={e=>setName(e.target.value)}  />
    </p>
    <p className="form-field">
      <label htmlFor="email" className="field-text profile-field-text">Email: </label>
      <input className='field-input' type="email" value={email} name='email' id='email' onChange={e=>setEmail(e.target.value)}  />
    </p>
    <div className='submit-btn-container'>
      <button type="submit" className='submit-btn' >Submit</button>
      </div>
    </form>
    </div>
    

  </Layout>
</>
}

export default Dashboard