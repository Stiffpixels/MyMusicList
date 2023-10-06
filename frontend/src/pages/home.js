import React, { useState } from 'react'
import Layout from '../components/layout/layout'
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';
import toast from 'react-hot-toast';

//import ImageSlider from '../layout/ImageSlider.js'

const Home = () => {
  /*const slides = [
    {url:'./images/perfume1.jpg', alt:'perfume showcase'}
  ]*/
  const [ data, setData ] = useState({})
  const getData = async ()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/music`)
      if(response.data.success){
        setData(response.data.Music)
        console.log(data)
      }
    } catch (error) {
      toast.error("server error")
    }
    
  }


  return (
    <Layout title="Best Place to Keep your Music Organized" keywords="Music, Music List, Indian Website" description="home page of My Music List" author="Muzammil">
      
      
    </Layout>
  )
}

export default Home