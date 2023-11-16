import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'


const Album = () => {
  const { albumId } = useParams()
  const [album, setAlbum] = useState({})
  const getAlbum = async (AlbumId)=>{
    try {
        const resp = await axios.get(`${process.env.REACT_APP_API}/api/v1/musicDetail?id=${albumId}`)
        if(resp.data.success){
            setAlbum(resp.data.Music)
        }
    } catch (error) {
        console.log(error)
    }
  }

  const binToBase64 = (buffer)=>{
    let binary = ''
    const bytes = [].slice.call(new Uint8Array(buffer))
    bytes.forEach((b)=> binary += String.fromCharCode(b))
    return window.btoa(binary)
  }

  useEffect(()=>{
    getAlbum()
  }, [])

  return (
    <Layout title="Album">
    <div className="form" style={{margin:'2em 0'}}>
      <div className="album-container">
      <div className="album_cover">
      <img src={`data:image/jpg;base64,${binToBase64(album?.image?.data?.data)}`} alt=" profile" />
      </div>
      <div >
        <div className="artist-and-rating" style={{marginTop:'.5em'}} >
          <h3 style={{fontFamily:'Roboto Condensed, sans-serif'}}>{album.name}</h3>
          <p style={{fontSize:"1rem", fontWeight:'bolder'}}><FaStar color='#fcb603'  size={20} style={{marginTop:'-.2em'}}/>{album.rating}</p>
        </div>
        
        <p>{album.description}</p>
        <div className="Songs" style={{marginTop:'2em'}}>
        <p style={{fontWeight:'bolder'}}>Songs:</p>
        <ul style={{listStyle:'none'}}>
          {
            album?.songs?.map((song, index)=>{
              return <li key={index} style={{background:'white', padding:'.5em', borderRadius:'10px', marginTop:'.75em'}}>
                <label style={{fontSize:'1.1rem'}}>{song.songName}</label><br></br>
                <label style={{fontSize:'.75em'}}>Credits: {song.credits}</label>
              </li>
            })
          }
        </ul>
        </div>
        <div className="Songs" style={{marginTop:'2em'}}>
        <p style={{fontWeight:'bolder'}}>Reviews:</p>
        <ul style={{listStyle:'none'}}>
          {
            album?.reviews?.map((review, index)=>{
              return <li key={index} style={{background:'white', padding:'.5em', borderRadius:'10px', marginTop:'.75em'}}>
                <label style={{fontSize:'1.1rem'}}>{review.name}</label><br></br>
                <label style={{fontSize:'.75em'}}> {review.comment}</label>
              </li>
            })
          }
        </ul>
        </div>
        
      </div>
      </div>
    </div>
    </Layout>
  )
}

export default Album