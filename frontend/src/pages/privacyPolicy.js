import React from 'react'
import Layout from '../components/layout/layout'

const about = () => {
  return (
    <Layout title="Privacy Policy" keywords="attar, Attar in mankhurd, perfume" description="Privacy policy of scentuary perfumes" author="Kashif Qureshi">
        <div className='contact'>
          <img src={require("./images/privacyPolicy.jpg")} alt="Call center providing customer service" />
          <div className='contact-content'>
            <h1 className='contact-heading'> Privacy policy</h1>
            <p>Welcome to MyMusicList! We value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, share, and safeguard your personal information.</p>
              <dl>
                <dt>Account Information:</dt>
                <dd>When you create an account, we collect your username, email address, and any other information you choose to provide.</dd>
                <dt>Music Preferences:</dt>
                <dd>We collect data related to your music preferences, playlists, and interactions with our platform to enhance your personalized experience.</dd>
                <dt>Communication:</dt>
                <dd>We may send you updates, newsletters, or important information related to your account and the services we provide.</dd>
                <dt>Children's Privacy:</dt>
                <dd>MyMusicList is not intended for children under the age of 13. We do not knowingly collect personal information from children.</dd>
              </dl>
          </div>
        </div>
    </Layout>
  )
}

export default about