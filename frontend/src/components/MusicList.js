import React from 'react'

const MusicList = ({albums}) => {
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
                        <p className="artist profile-field-text" style={{fontSize:'.7em'}}>{album.artist}</p>
                      </div>
                    </div>
                  </>
                })
              
                
            )
          }
    </div>
  )
}

export default MusicList