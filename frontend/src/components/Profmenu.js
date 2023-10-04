import React from 'react'
import { NavLink } from 'react-router-dom'
const Profmenu =()=>{
  return (
    <div className="flexbox-row">
      <div className="flex-col rounded text-center tabs">
        <p className="list-item">
        <NavLink to="/dashboard/general" >General</NavLink>
        </p>
        <p className="list-item">
        <NavLink to="/dashboard/my-list" >My List</NavLink>
        </p>
      </div>
      
      <div className="flex-col">
        <img src={require("./images/profilePic.jpg")} alt="Female profile picture."/>
        
      </div>
    </div>
    )
}

export default Profmenu