import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import toast from 'react-hot-toast'



const Modal = ({open, onClose, albumId}) => { 
  if(open===false) return null

  const addToList = async (e)=>{
    e.preventDefault()
    const listName = e.target.textContent.toLowerCase()
    try {
        const resp = await axios.put(`${process.env.REACT_APP_API}/api/v1/add/tolist`, {albumId, listName})
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
                    Where do you want to add this album?
                    <button type="button" style={btnStyles} onClick={onClose}>⛌</button>
                </div>
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