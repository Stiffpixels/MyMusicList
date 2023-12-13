import React, { useState, useRef } from "react"
import toast from "react-hot-toast"
import axios from "axios"

const AdminProfile = ()=>{
    const [image, setImage] = useState({})
    const [music, setMusic] = useState({name:"", artist:"", description:"", category:""})
    const [songs, setSongs] = useState([])
    const [numOfSongs, setNumOfSongs] = useState(1)
    
    const songsRef = useRef()



    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(image?.data?.size>1*1000*1024){
            toast.error('Image size cannot be more than 1MB')
            return
        }
        else if(songs.length===0){
            toast.error("PLease add atleast one song to the album/single and save")
            return
        }

        let formData = new FormData()
        formData.append("cover_art", image)
        formData.append("cover_art", image?.data)
        formData.append("songs", JSON.stringify(songs))
        setSongs([])
        
        Object.entries(music).forEach(([key, value])=>{
            formData.append(`${key}`, value)
        })

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/music/new`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
            if(response?.data?.success){
                toast.success("Music Added")
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        }
    }

    const handleFileChange = (e)=>{
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
    }

    const saveSongs = (e)=>{
        e.preventDefault()
        const songInputs = songsRef?.current?.querySelectorAll("input[name=songs]")
        const songsList = {}

        songInputs.forEach((currValue, currIndex)=>{
            if(currValue.id==="credits"){
                songsList[`song${currIndex-1}`].credits = currValue.value
            }else{
                songsList[`song${currIndex}`] = { songName:currValue.value }
            }
        })
        console.log(songsList)
        setSongs(songsList)


    }

    const addSong = (e)=>{
        e.preventDefault()
        setNumOfSongs(numOfSongs+1)
    }

    

    return (
        <>
        <div className="form-container" style={{ marginBottom:'3em'}}>
        <form className='form'  onSubmit={e=>handleSubmit(e)}>
            <h3 className="form-title" style={{textTransform:"uppercase"}}>Add Music</h3>
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="name">Album Name: </label>
                <input className='field-input' type="text" name="name" id="name" value={music.name} onChange={(e)=>setMusic({...music, name:e.target.value})} />
            </p>
            
            <div className="form-field" style={{width:'60%'}}>
                <label className="field-text " style={{color:"black", marginBottom:".5em"}} htmlFor="songs">Songs: </label>
                <ol className="songlist" ref={songsRef}>
                    {
                        [...Array(numOfSongs)].map((index)=>{
                            console.log(index)
                            return <li className="song" key={index}>
                                <label className="field-text profile-field-text" htmlFor="song1" style={{marginTop:"0"}}>Name:</label>
                                <input type="text" className="field-input singleSong" name="songs" id="song1"/>
                                <label className="field-text profile-field-text" htmlFor="credits">Credit:</label>
                                <input type="text" className="field-input" name="songs" id="credits"/>
                            </li>
                        })
                    }
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <button type="button" className="btn saveSongs text-light bg-secondary" onClick={(e)=>addSong(e)}  >Add More</button>
                        <button type="button" className="btn addSong text-light bg-secondary" onClick={(e)=>saveSongs(e)}  >Save</button>
                    </div>
                    
                </ol>
            </div>
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="category">Category: </label>
                <input className='field-input' type="text" name="category" id="category" value={music.category} onChange={(e)=>setMusic({...music, category:e.target.value})} />
            </p>
            <p className="form-field">
                <label className="field-text profile-field-text" htmlFor="artist">Artist: </label>
                <input className='field-input' type="text" name="artist" id="artist" value={music.artist} onChange={(e)=>setMusic({...music, artist:e.target.value})}/>
            </p>
            <p className="form-field music-description">
                <label className="field-text profile-field-text " htmlFor="description">Description: </label>
                <textarea className="music-description-box"  type="text" name="description" id="description" value={music.description} onChange={(e)=>setMusic({...music, description:e.target.value})} />
            </p>
            <p className="form-field file-input">
                <input type='file' name='cover_art' onChange={e=>handleFileChange(e)}></input>
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