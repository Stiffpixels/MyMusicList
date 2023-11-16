import './App.css';
//import Layout from './components/layout/layout.js'
import axios from 'axios'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import PageNotFound from './pages/pageNotFound'
import PrivacyPolicy from './pages/privacyPolicy'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.js'
import Forgotpassword from './pages/Forgotpassword.js'
import Resetpassword from './pages/Resetpassword.js'
import Privateroute from './components/Private routes/Privateroute.js'
import Currentlist from "./pages/Currentlist.js"
import Completedlist from "./pages/Completedlist.js"
import Plannedlist from "./pages/Plannedlist.js"
import Album from './pages/Album.js';

function App() {
  axios.defaults.withCredentials = true
  return <>
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/:albumId' element={ <Album />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='*' element={<PageNotFound />} />
    <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
    <Route path="/dashboard" element={<Privateroute />} >
      <Route path='' element={<Dashboard />} />
      <Route path='general' element={<Dashboard />} />
      <Route path='current-list' element={<Currentlist />} />
      <Route path='completed-list' element={<Completedlist />} />
      <Route path='planned-list' element={<Plannedlist />} />
    </Route>
    
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    
    <Route path='/password/forgot' element={<Forgotpassword/>} />
    <Route path='/password/reset/:token' element={<Resetpassword/>} />
  </Routes>

  </>
}

export default App;
