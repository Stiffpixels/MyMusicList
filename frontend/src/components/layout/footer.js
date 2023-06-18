import React from 'react'
import { Link } from 'react-router-dom'

const footer = () => {
  return (
    <div className='footer bg-dark text-light p-3'>
      <h6 className='text-center'>All Right Reserved &copy;Scentuary </h6>
      <p className='text-center'>
        <Link to='/about'>About</Link>
        <Link to='/privacyPolicy'>Privacy Policy</Link>
        <Link to='/FAQs'>FAQs</Link>
      </p>
    </div>
  )
}

export default footer