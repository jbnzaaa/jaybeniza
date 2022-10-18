// React 
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// 
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import DailyDiscount from './components/pages/projects/DailyDiscount';
import Jbnza from './components/pages/projects/Jbnza';
import Regain from './components/pages/projects/Regain';
// import Scroll from './components/animation/SmoothScrollbar';

function App() {
  return (
    <>
      <Router>
        {/* navbar */}
        <Navbar/>
        {/* routes */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dailydiscount' element={<DailyDiscount/>}/>
          <Route path='/jbnza' element={<Jbnza/>}/>
          <Route path='/regain' element={<Regain/>}/>
        </Routes>
        {/* footer */}
        <Footer/>
      </Router>
    </>
  );
}

export default App;