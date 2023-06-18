import React from 'react'
import Layout from '../layout/layout'
import {Link} from 'react-router-dom'

const pageNotFound = () => {
  return (
    <Layout title="Page not Found" keywords="attar, Attar in mankhurd, perfume" description="page is not available" author="Kashif Qureshi">
      <div className='pnf'>
        <h1 className='pnf-heading'>4<span style={{ color: 'orangered' }}>0</span>4</h1>
        <p className='pnf-text'>Oops! looks like your lost this page doesn't exist.</p>
        <Link type="button" to='/' className='pnf-btn'>Go Back</Link>
      </div>
        
    </Layout>
    
  )
}

export default pageNotFound