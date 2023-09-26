import './App.css';
//import Layout from './components/layout/layout.js'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import PageNotFound from './pages/pageNotFound'
import PrivacyPolicy from './pages/privacyPolicy'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.js'


function App() {
  return <>
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='*' element={<PageNotFound />} />
    <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/dashboard' element={<Dashboard/>} />
  </Routes>

  </>
}

export default App;
