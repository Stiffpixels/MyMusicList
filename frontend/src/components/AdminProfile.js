import React, { useState } from "react"

const AdminProfile = ()=>{
    const [image, setImage] = useState({})
    const handleSubmit = ()=>{
        console.log("hello")
    }

    const handleFileChange = (e)=>{
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
    }
    return (
        <>
                <div className="form-container" style={{width:'100%', margin:'0', marginBottom:'3em'}}>
        <form className='form' onSubmit={e=>handleSubmit(e)}>
            <h3 className="form-title" style={{textTransform:"uppercase"}}>Add Music</h3>
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="name">Name: </label>
                <input className='field-input' type="text" name="name" id="name" />
            </p>
            
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="name">Album: </label>
                <input className='field-input' type="text" name="album" id="album" />
            </p>
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="name">Category: </label>
                <input className='field-input' type="text" name="category" id="category" />
            </p>
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="name">Name: </label>
                <input className='field-input' type="text" name="name" id="name" />
            </p>
            <p className="form-field music-description">
                <label className="field-text profile-field-text " htmlFor="name">Description: </label>
                <textarea className="music-description-box"  type="text" name="description" id="description" />
            </p>
            <p className="form-field file-input">
                <input type='file' name='profile_pic' onChange={e=>handleFileChange(e)}></input>
            </p>
        <div className='submit-btn-container'>
        <button type="submit" className='submit-btn' >Submit</button>
        </div>
        </form>
        </div>
        </>
    )
}

export default AdminProfile