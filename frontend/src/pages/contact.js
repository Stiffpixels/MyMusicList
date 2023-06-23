import React from 'react'
import Layout from '../components/layout/layout'
import {BsTelephone, BsPhone} from 'react-icons/bs'

import {AiOutlineMail} from 'react-icons/ai'

const contact = () => {
  return (
    <Layout title="Contact us" keywords="attar, Attar in mankhurd, perfume" description="contact scentuary perfumes" author="Kashif Qureshi">
        <div className='contact'>
          <img src={require("./images/contactImage.jpg")} alt="Call center providing customer service" />
          <div className='contact-content'>
            <h1 className='contact-heading'>Contact</h1>
            <p>PLease let us know about any <strong>problems</strong> you may have with our products, or want to order in <strong>bulk.</strong></p>
            <ul>
              <li><AiOutlineMail/>scentuary78666@gmail.com</li>
              <li><BsPhone/>8734562183</li>
              <li><BsTelephone/>1800-845-9818</li>
            </ul>
          </div>
        </div>
    </Layout>
    
  )
}

export default contact