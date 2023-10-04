import React from 'react'
import { NavLink, Link} from 'react-router-dom'
const Profmenu =()=>{
  return (
    <div className="flexbox-row">
      <div className="flex-col rounded text-center tabs">
        <p className="list-item">
        <NavLink to="/dashboard/general" >General</NavLink>
        </p>
        <p className="list-item">
          <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            My List
          </Link>
          <ul className="dropdown-menu list-unstyled">
            <li><NavLink to='/dashboard/current-list' className="dropdown-item"  >Current</NavLink></li>
            <li><NavLink className="dropdown-item" to="/dashboard/completed-List">Completed</NavLink></li>
          </ul>
        </p>
      </div>
    </div>
    )
}

export default Profmenu