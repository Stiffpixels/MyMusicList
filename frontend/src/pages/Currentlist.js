import React from "react"
import Layout from "../components/layout/layout.js"
import Profmenu from "../components/Profmenu.js"

const Currentlist = ()=>{
  return(
    <Layout title="My List">
      <Profmenu />
      <h1>Current List</h1>
    </Layout>
    )
}

export default Currentlist