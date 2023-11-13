import React, { useEffect, useState } from "react"
import Layout from "../components/layout/layout.js"
import Profmenu from "../components/Profmenu.js"
import axios from "axios"
import MusicList from "../components/MusicList.js"

const Completedlist = () => {
  const [albums, setAlbums] = useState([])
  const getUserList = async()=>{
    
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API}/api/v1/list?list=completed`)
      if(resp.data.success){
        setAlbums(resp.data.List)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUserList()
  }, [])
  return (
    <Layout title="Completed">
      <Profmenu />
      <MusicList albums={albums}/>
    </Layout>
  )
}

export default Completedlist