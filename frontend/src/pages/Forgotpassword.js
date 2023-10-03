import React, { useState } from 'react'
import Layout from '../components/layout/layout.js'
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword=()=>{
  const [email, setEmail] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/password/reset`, { email })
      if(res.data.success){
        setTimeout(()=>{
          toast.success('reset password link sent to the email')
        }, 2000)
      }
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <Layout title="forgot password" >
      <div className="form-container">
        <form className="form" onSubmit={(e)=>handleSubmit(e)}>
          <p className="form-field">
            <label htmlFor="email" className="field-text">Email: </label>
            <input className='field-input' value={ email } type="email" name='email' id='email' onChange={(e)=>setEmail(e.target.value)} />
          </p>
          <div className='submit-btn-container'>
          <button type="submit" className='submit-btn' >Submit</button>
            </div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword