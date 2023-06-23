import React from 'react'
import Layout from '../components/layout/layout'

const about = () => {
  return (
    <Layout title="Privacy Policy" keywords="attar, Attar in mankhurd, perfume" description="Privacy policy of scentuary perfumes" author="Kashif Qureshi">
        <div className='contact'>
          <img src={require("./images/privacyPolicy.jpg")} alt="Call center providing customer service" />
          <div className='contact-content'>
            <h1 className='contact-heading'> Privacy policy</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, dolor?Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae molestias quibusdam repudiandae aliquid in esse sapiente error tenetur vero repellat distinctio fugiat sint suscipit dolorum illum modi nobis harum voluptates inventore quae, vitae sequi. Quibusdam odio aliquid culpa ea! Voluptatibus minima fuga repellat distinctio quasi quas provident obcaecati nihil voluptatum!</p>
          </div>
        </div>
    </Layout>
  )
}

export default about