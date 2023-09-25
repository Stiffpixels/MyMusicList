import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import 'react-slideshow-image/dist/styles.css';
import { useAuth } from '../context/auth'

//import ImageSlider from '../layout/ImageSlider.js'

const Home = () => {
  /*const slides = [
    {url:'./images/perfume1.jpg', alt:'perfume showcase'}
  ]*/
  const [auth, setAuth] = useAuth()
  return (
    <Layout title="Best Place to Keep your Music Organized" keywords="Music, Music List, Indian Website" description="home page of My Music List" author="Muzammil">
      <h1>Home</h1>
      
    </Layout>
  )
}

export default Home