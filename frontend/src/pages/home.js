import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';

//import ImageSlider from '../layout/ImageSlider.js'

const Home = () => {
  const [ music, setMusic ] = useState([])
  const fetchData =async ()=>{
  try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/music`)
      if(res.data.success){
        setMusic(res.data.Music)
        
      }
  } catch (error) {
      console.log(error);
  }
  }
  const binToBase64 = (buffer)=>{
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b)=> binary += String.fromCharCode(b))
    return window.btoa(binary)
  }
  
  useEffect(()=>{
    fetchData()
  }, [])
  


  return (
    <Layout title="Best Place to Keep your Music Organized" keywords="Music, Music List, Indian Website" description="home page of My Music List" author="Muzammil">
      
        <div className='music-grid'>
          
          {
            music.length===0?(<p>no music found</p> ):(

              
                music.map((album, index)=>{
                  return <>
                    <div className="music-container" key={index}>
                      <div className="album-cover">
                        <img src={`data:image/jpg;base64,${binToBase64(album?.image?.data?.data)}`} alt="music cover" />
                      </div>
                      <div className="details">
                        <div className="music-name">{album.name}</div>
                      </div>
                    </div>
                  </>
                })
              
                
            )
          }
          
        </div>
      
    </Layout>
  )
}

export default Home