import React from 'react'
import Layout from '../components/layout/layout'

import {AiOutlineMail} from 'react-icons/ai'

const contact = () => {
  return (
    <Layout title="Contact us" keywords="Music, Music List, Indian Website" description="contact My Music List" author="Muzammil">
        <div className='contact'>
          <img src={require("./images/contactImage.jpg")} alt="Call center providing customer service" />
          <div className='contact-content'>
            <h1 className='contact-heading'>Contact</h1>
            <p>PLease let us know about any <strong>problems</strong> you may have with our products, or want to order in <strong>bulk.</strong></p>
            <ul>
              <li><AiOutlineMail/>mymusiclist@gmail.com</li>
            </ul>
          </div>
        </div>
    </Layout>
    
  )
}

export default contact