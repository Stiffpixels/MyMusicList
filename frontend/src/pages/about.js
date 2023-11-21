import React from 'react'
import Layout from '../components/layout/layout'

const about = () => {
  return (
    <Layout title="About us" keywords="attar, Attar in mankhurd, perfume" description="about scentuary perfumes" author="Kashif Qureshi" >
        <div className='contact'>
          <img src={require("./images/aboutUs.jpg")} alt="Call center providing customer service" />
          <div className='contact-content'>
            <h1 className='contact-heading'>About us</h1>
            <p>Welcome to MyMusicList, where passion meets melody and the joy of music finds its digital home! We are a vibrant online community dedicated to documenting the world of music in all its diverse glory. Whether you're a seasoned audiophile or just starting to explore the vast universe of tunes, MyMusicList is your go-to destination for discovering, sharing, and celebrating the magic of sound.</p>
            <p>At the heart of MyMusicList is a user-friendly platform designed to make documenting your musical journey a seamless and enjoyable experience. Create personalized Lists, curate your favorite albums, and share your musical discoveries with a community that speaks the universal language of melody. Whether you're into chart-topping hits, indie gems, or niche genres, MyMusicList embraces the diversity of musical tastes, ensuring there's something for everyone.</p>
            <p>Thank you for being a part of MyMusicList – where every beat counts, and every note resonates in the symphony of our shared musical experiences. Let the music play, and let the community thrive!</p>
          </div>
        </div>
    </Layout>
  )
}

export default about