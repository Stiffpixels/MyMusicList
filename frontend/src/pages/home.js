import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/layout'
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'
import Modal from '../components/Modal';
//import ImageSlider from '../layout/ImageSlider.js'

const Home = () => {
  const [ music, setMusic ] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [AlbumId, setAlbumId] = useState('')
  const [userList, setUserList] = useState([])

  const fetchData =async ()=>{
  try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/music`)
      const user = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`)
      if(res.data.success){
        setMusic(res.data.Music)
      }
      if(user.data.success){
        const current = user.data.user.musicList.current
        const completed = user.data.user.musicList.completed
        const planned = user.data.user.musicList.planning

        setUserList(current.concat(completed).concat(planned))
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
  }, [isModalOpen])
  


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
                      <div className="music-details">
                        <p className="music-name">{album.name}</p>
                        <p className="artist profile-field-text" style={{fontSize:'.7em'}}>{album.artist}</p>
                      </div>
                      <div className="music-buttons">
                        <button type="button" className='view-more'>View More</button>
                        {
                          !userList.includes(album._id) && <button type="button"  className='btn bg-success text-light' onClick={(e)=>{
                            e.preventDefault()
                            setAlbumId(album._id)
                            setModalOpen(true)
                          }} style={{padding:"0 .3em .17em .3em", fontSize:'.85rem'}}><FaPlus/></button>
                        }
                        
                      </div>
                    </div>
                    
                  </>
                })
              
                
            )
          }
         <Modal open={isModalOpen} onClose={()=>setModalOpen(false)} albumId={AlbumId}/>
          
        
        </div>
      
    </Layout>
  )
}

export default Home