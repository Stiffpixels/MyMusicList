import React,{useState, useEffect } from 'react'
import Layout from '../components/layout/layout.js'
import axios from 'axios'
import Profmenu from "../components/Profmenu"
import toast from 'react-hot-toast'

const Dashboard = ()=>{
  const [user, setUser] = useState({})
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [image, setImage] = useState({ preview: '', data: '' })
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    toast.success(`Name: ${name} Email: ${email}`)
    let formData = new FormData()
    formData.append("image", image)

    formData.append('file', image.data)
    const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/update/details`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
    if (response) toast.success("response received")

  }
  const handleFileChange = (e)=>{
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }
  useEffect(()=>{
    const asyncFunc = async ()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, { withCredentials:true})
        if(res.data.success){
          setUser(res.data.user)
        }
      }catch(error){
        console.log(error)
    }
    }
    asyncFunc()
  }, [])
  

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
    <p>
      <input type='file' name='file' onChange={e=>handleFileChange(e)}></input>
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