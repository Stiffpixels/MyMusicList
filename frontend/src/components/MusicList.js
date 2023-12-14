import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import UpdateModal from './UpdateModal'

const MusicList = ({albums, list, rerender}) => {
  const [openModal, setOpenModal] = useState(false)
  const [albumId, setAlbumId] = useState('')
    const binToBase64 = (buffer)=>{
        let binary = ''
        const bytes = [].slice.call(new Uint8Array(buffer))
        bytes.forEach((b)=> binary += String.fromCharCode(b))
        return window.btoa(binary)
    }
  return (
    <>
          {
            albums.length===0?(<div className="form-container"><div className="form" style={{ padding:'1em 0', fontSize:'1rem', color:'black'}}> <label>No music has been added to this list</label> </div></div> ):(
              <div className='music-grid'>
                {
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
                        <Link className='view-more' to={`../../album/${album._id}`}>View More</Link>
                        <button type="button" style={{ border:'0'}} onClick={()=>{
                          setAlbumId(album._id)
                          setOpenModal(true)
                          }}>Edit</button>
                      </div>
                    </div>
                  
                  </>
                  
                })
                }
                </div>
              
                
            )
          }
    < UpdateModal open={openModal} onClose={()=>setOpenModal(false)} albumId={albumId} listName={list} rerender={rerender}/>
    </>
  )
}

export default MusicList