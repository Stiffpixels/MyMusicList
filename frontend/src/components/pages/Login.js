import React from 'react'
import Layout from '../layout/layout'

const Login = () => {
  return (
    <Layout title="Login">
        <div className="form-container">
            <form className="form">
                <h2 className='form-title'>Login</h2>
                <p className="form-field">
                    <label htmlFor="email" className="field-text">Email: </label>
                    <input className='field-input' type="email" name='email' id='email'/>
                </p>
                <p className="form-field">
                    <label htmlFor="password" className="field-text">Password: </label>
                    <input className='field-input' type="password" name='password' id='password'/>
                </p>
                <div className='submit-btn-container'>
                <button type="submit" className='submit-btn' >Login</button>
                </div>
            </form>
        </div>
    </Layout>
  )
}

export default Login