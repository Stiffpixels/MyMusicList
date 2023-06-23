import React,{ useState } from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import toast from 'react-hot-toast';



const Register = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            console.log(email,name, )
            const resp = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, {name, email,password})
            if(resp.data.success){
                setTimeout(()=>toast.success(resp.data.message), 500)
                navigate('/login')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <Layout title="Register">
        <div className="form-container">
            <form className="form" onSubmit={ handleSubmit }>
                <h2 className='form-title'>Register</h2>
                <p className="form-field">
                    <label htmlFor="name" className="field-text">Name: </label>
                    <input className='field-input' type="text" name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                </p>
                <p className="form-field">
                    <label htmlFor="email" className="field-text">Email: </label>
                    <input className='field-input' type="email" name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </p>
                <p className="form-field">
                    <label htmlFor="password" className="field-text">Password: </label>
                    <input className='field-input' type="password" name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </p>
                <div className='submit-btn-container'>
                <button type="submit" className='submit-btn' >Register</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Register