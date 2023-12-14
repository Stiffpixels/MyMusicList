import React, { useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import toast from 'react-hot-toast'



const UpdateModal = ({open, onClose, albumId, listName, rerender}) => {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [comment, setComment] = useState('')
  const [updatedList, setUpdatedList] = useState(listName)
  if(open===false) return null

  const UpdateList = async (e)=>{
    e.preventDefault()

    if(e.target.id ==='delete'){
        try {
            const resp = await axios.delete(`${process.env.REACT_APP_API}/api/v1/delete/list?albumId=${albumId}&listName=${listName}`)
            if(resp.data.success){
                toast.success('Album has been Deleted')
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.reponse?.data?.message)
        }
        return
    }
    try {
        const resp = await axios.put(`${process.env.REACT_APP_API}/api/v1/update/list?albumId=${albumId}&listName=${listName}&comment=${comment}&rating=${rating}&updatedList=${updatedList}`)
        if(resp.data.success){
            toast.success('Album has been updated')
        }
    } catch (error) {
        console.log(error);
        toast.error(error?.reponse?.data?.message)
    }
    rerender()
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
                <form className="form" style={{display:'flex', flexDirection:'column', padding:'0', marginBottom:'1em'}}>
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
                    <select name="UpdatedList" id="UpdatedList" className='updated-list' onChange={(e)=>setUpdatedList(e.target.value)} value={updatedList} >
                        <option value="current">Current</option>
                        <option value="completed">Completed</option>
                        <option value="planning">Planning</option>
                    </select >
                        <textarea style={{width:'100%', marginTop:'1em', minHeight:'13vh'}} name="review-comment" id="review-comment" className="music-description-boxx" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                        <div className='submit-btn-container'>
                        <button type="submit" className='submit-btn' onClick={e=>UpdateList(e)} id='update'  style={{marginRight:'1em'}}>Update</button>
                        <button type="submit" className='submit-btn text-danger' onClick={e=>UpdateList(e)} id='delete'  >Delete</button>
                        </div>
                        
                </form>

            </div>
        </div>
    </>,
  document.getElementById('portal'))
}

export default UpdateModal