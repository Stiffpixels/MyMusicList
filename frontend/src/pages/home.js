import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';

//import ImageSlider from '../layout/ImageSlider.js'

const Home = () => {
  const [ data, setData ] = useState([])
  const fetchData =async ()=>{
  try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/music`)
      if(res.data.success){
        setData(res.data.Music)
      }
  } catch (error) {
      console.log(error);
  }
  }
  
  useEffect(()=>{
    fetchData()
  }, [])
  


  return (
    <Layout title="Best Place to Keep your Music Organized" keywords="Music, Music List, Indian Website" description="home page of My Music List" author="Muzammil">
      <div className='form-container'>
        <div className="form">
          
          {
            JSON.stringify(data)==="{}"?( <p>{data[0].name}</p>):( <p>no music found</p>)
          }
          
        </div>
      </div>
      
    </Layout>
  )
}

export default Home