import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import UpdateModal from './UpdateModal'

const MusicList = ({albums, list}) => {
  const [openModal, setOpenModal] = useState(false)
  const [albumId, setAlbumId] = useState('')
    const binToBase64 = (buffer)=>{
        let binary = ''
        const bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b)=> binary += String.fromCharCode(b))
        return window.btoa(binary)
    }
  return (
    <div className='music-grid'>
          {
            albums.length===0?(<p>no music found</p> ):(
                albums.map((album, index)=>{
                  return <>
                    <div className="music-container" key={index}>
                      <div className="album-cover">
                        <img src={`data:image/jpg;base64,${binToBase64(album?.image?.data?.data)}`} alt="music cover" />
                      </div>
                      <div className="music-details">
                        <p className="music-name">{album.name}</p>
                        <div className="artist-and-rating">
                          <p className="artist profile-field-text" style={{fontSize:'1em'}}>{album.artist}</p>
                          <p className="rating"><FaStar color='#fcb603' style={{marginTop:"-.35em"}}/>{album.rating}</p>
                        </div>
                      </div>
                      <div className="music-buttons" style={{display:'flex', alignItems:'center'}}>
                        <Link className='view-more' to={`../../${album._id}`}>View More</Link>
                        <button type="button" style={{ border:'0'}} onClick={()=>{
                          setAlbumId(album._id)
                          setOpenModal(true)
                          }}>Edit</button>
                      </div>
                    </div>
                  </>
                })
              
                
            )
          }
    < UpdateModal open={openModal} onClose={()=>setOpenModal(false)} albumId={albumId} listName={list} />
    </div>
  )
}

export default MusicList