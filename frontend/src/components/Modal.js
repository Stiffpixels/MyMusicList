import React, { useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'



const Modal = ({open, onClose, albumId}) => {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  if(open===false) return null

  const addToList = async (e)=>{
    e.preventDefault()
    const listName = e.target.textContent.toLowerCase()
    
    try {
        const resp = await axios.put(`${process.env.REACT_APP_API}/api/v1/add/list`, {albumId, listName, rating})
        if(resp.data.success===true){
            onClose()
            toast.success("Album added to the list")
        }
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
  }

  const btnStyles = {padding:"0.5em", border:'0'}
  return ReactDom.createPortal(
    <>
        <div className="Modal-overlay">
            <div className="music-container Modal" >
                <div className="close-btn" style={{ display:"flex", alignItems:'center', justifyContent:'space-between'}}>
                    Provide rating and location
                    <button type="button" style={btnStyles} onClick={onClose}>⛌</button>
                </div>
                <form className="form" style={{display:'flex', flexDirection:'row', padding:'0', marginBottom:'1em'}}>
                    {
                        [...Array(5)].map((star, index)=>{
                            const currentRating = index + 1
                            return(
                                <label >
                                    <input
                                    type="radio"
                                    name="rating"
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
                </form>
                <div className="list-options">
                    <div className="current">
                        <button type="button" className="Modal-btn" style={btnStyles} onClick={e=>addToList(e)}>Current</button>
                    </div>
                    <div className="completed">
                        <button type="button" className="Modal-btn" style={btnStyles} onClick={e=>addToList(e)}>Completed</button>
                    </div>
                    <div className="planning">
                        <button type="button" className="Modal-btn" style={btnStyles} onClick={e=>addToList(e)}>Planning</button>
                    </div>
                </div>
            </div>
        </div>
    </>,
  document.getElementById('portal'))
}

export default Modal