import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import {GiDelicatePerfume, GiShoppingCart} from 'react-icons/gi'

const header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to='/' className="navbar-brand"><GiDelicatePerfume/>Scentuary</Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/contact' className="nav-link">Contact</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/register' className="nav-link">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/login' className="nav-link" >Login</NavLink>
        </li>
        <li className="nav-item cart">
          <NavLink to='/cart' className="nav-link" ><GiShoppingCart /></NavLink>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

    </>
  )
}

export default header