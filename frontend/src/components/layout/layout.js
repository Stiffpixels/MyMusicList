import React from 'react'
import Footer from './footer.js'
import Header from './header.js'
import {Helmet} from 'react-helmet'

const layout = ({children, title, description, keywords, author}) => {
  return (
    <>
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author}/>
        <meta name="keywords" content={keywords} />
    </Helmet>
    <Header/>
    <main className='content'>
    { children }
    </main>
    <Footer/>
    </>
  )
}

export default layout