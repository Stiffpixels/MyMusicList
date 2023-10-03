import React, { useState } from 'react'
import Layout from '../components/layout/layout.js'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Resetpassword = ()=>{
  const { token } = useParams()
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const navigate = useNavigate()
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/reset/${token}`,{password, confirmPassword})
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/login')
      }
    } catch (e) {
      toast.error(e.response.data.message)
    }
  }
  return (
    <Layout title="reset password for MyMusicList">
      <div className="form-container">
        <form className="form" onSubmit={(e)=>handleSubmit(e)}>
          <p className="form-field">
            <label htmlFor="password" className="field-text">Password: </label>
            <input className='field-input' value={ password } type="password" name='password' id='password' onChange={(e)=>setPassword(e.target.value)} />
          </p>
          <p className="form-field">
            <label htmlFor="confirmPassword" className="field-text">Confirm Password: </label>
            <input className='field-input' value={ confirmPassword } type="password" name='confirmPassword' id='confirmPassword' onChange={(e)=>setConfirmPassword(e.target.value)} />
          </p>
          <div className='submit-btn-container'>
          <button type="submit" className='submit-btn' >Submit</button>
            </div>
        </form>
      </div>
    </Layout>
    )
}
export default Resetpassword