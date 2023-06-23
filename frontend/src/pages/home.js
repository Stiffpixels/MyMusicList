import React from 'react'
import Layout from '../components/layout/layout'
import 'react-slideshow-image/dist/styles.css';
import { useAuth } from '../context/auth.js';
//import ImageSlider from '../layout/ImageSlider.js'

const Home = () => {
  /*const slides = [
    {url:'./images/perfume1.jpg', alt:'perfume showcase'}
  ]*/
  const [auth, setAuth] = useAuth()
  return (
    <Layout title="Best Offers on Attars" keywords="attar, Attar in mankhurd, perfume" description="home page of scentuary perfumes" author="Kashif Qureshi">
      
      <h1>Home</h1>
      <pre>{ JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default Home