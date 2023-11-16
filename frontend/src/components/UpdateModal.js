import React, { useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'



const UpdateModal = ({open, onClose, albumId, listName}) => {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [comment, setComment] = useState('')
  if(open===false) return null

  const UpdateList = async (e)=>{
    e.preventDefault()
    try {
        const resp = await axios.get(`${process.env.REACT_APP_API}/api/v1/update/list?albumId=${albumId}&listName=${listName}&comment=${comment}&rating=${rating}`)
        if(resp.data.success){
            toast.success('Album has been updated')
        }
    } catch (error) {
        console.log(error);
    }
  }

  const btnStyles = {padding:"0.5em", border:'0'}
  return ReactDom.createPortal(
    <>
        <div className="Modal-overlay">
            <div className="music-container Modal" >
                <div className="close-btn" style={{ display:"flex", alignItems:'center', justifyContent:'space-between'}}>
                    Update Album
                    <button type="button" style={btnStyles} onClick={onClose}>⛌</button>
                </div>
                <form className="form" onSubmit={e=>UpdateList(e)} style={{display:'flex', flexDirection:'column', padding:'0', marginBottom:'1em'}}>
                    <div className="rating">
                    {
                        [...Array(5)].map((star, index)=>{
                            const currentRating = index + 1
                            return(
                                <label key={index}>
                                    <input
                                    type="radio"
                                    name="rating"
                                    aria-selected={index===0?"true" : "false"}
                                    value={currentRating}
                                    onClick={() => setRating(currentRating)} />
                                    <FaStar 
                                    className='star'
                                    size={30}
                                    color={currentRating <= ( hover || rating )? "#fcb603" : "#0d061c"}
                                    onMouseEnter= {()=>setHover(currentRating)}
                                    onMouseLeave={()=>setHover(null)}
                                    />
                                </label>
                            )
                        })
                    }
                    </div>
                        <textarea style={{width:'100%', marginTop:'1em', minHeight:'13vh'}} name="review-comment" id="review-comment" className="music-description-boxx" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        <div className='submit-btn-container'>
                        <button type="submit" className='submit-btn'  >Update</button>
                        </div>
                        
                </form>

            </div>
        </div>
    </>,
  document.getElementById('portal'))
}

export default UpdateModal