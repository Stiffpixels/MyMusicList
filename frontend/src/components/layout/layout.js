import React from 'react'
import Footer from './footer.js'
import Header from './header.js'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';

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
    <Toaster />
      { children }
    </main>
    <Footer/>
    </>
  )
}

export default layout