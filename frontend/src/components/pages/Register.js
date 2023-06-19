import React,{ useState } from 'react'
import Layout from '../layout/layout'

const Register = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [Email, setEmail] = useState('')

  return (
    <Layout title="Register">
        <div className="form-container">
            <form className="form">
                <h2 className='form-title'>Register</h2>
                <p className="form-field">
                    <label htmlFor="name" className="field-text">Name: </label>
                    <input className='field-input' type="text" name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)} />
                </p>
                <p className="form-field">
                    <label htmlFor="email" className="field-text">Email: </label>
                    <input className='field-input' type="email" name='email' id='email' value={Email} onChange={(e)=>setEmail(e.target.value)} />
                </p>
                <p className="form-field">
                    <label htmlFor="password" className="field-text">Password: </label>
                    <input className='field-input' type="password" name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
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