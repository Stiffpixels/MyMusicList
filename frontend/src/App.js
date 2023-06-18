import './App.css';
//import Layout from './components/layout/layout.js'
import {Routes, Route} from 'react-router-dom'
import HomePage from './components/pages/home'
import About from './components/pages/about'
import Contact from './components/pages/contact'
import PageNotFound from './components/pages/pageNotFound'
import PrivacyPolicy from './components/pages/privacyPolicy'

function App() {
  return <>
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='*' element={<PageNotFound />} />
    <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
  </Routes>

  </>
}

export default App;
