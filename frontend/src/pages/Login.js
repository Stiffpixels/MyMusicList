import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth.js'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const resp = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, { withCredentials:true })

            if(resp.data.success){
                setTimeout(()=>toast.success("Login successful"), 500)
                
                localStorage.setItem('auth', true)
                setAuth({user:true})
                navigate('/')
            }

        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <Layout title="Login">
        <div className="form-container">
            <form className="form" onSubmit={ handleSubmit }>
                <h2 className='form-title'>Login</h2>
                <p className="form-field">
                    <label htmlFor="email" className="field-text">Email: </label>
                    <input className='field-input' value={ email } type="email" name='email' id='email' onChange={(e)=>setEmail(e.target.value)} />
                </p>
                <p className="form-field">
                    <label htmlFor="password" className="field-text">Password: </label>
                    <input className='field-input'value={ password } type="password" name='password' id='password' onChange={(e)=>setPassword(e.target.value)} />
                </p>
                <Link to="/password/forgot" className="forgot-password"><a href="/password/forgot" >Forgot password</a></Link>
                <div className='submit-btn-container'>
                <button type="submit" className='submit-btn' >Login</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Login