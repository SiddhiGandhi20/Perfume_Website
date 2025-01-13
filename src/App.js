import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import VideoComponent from './components/VideoComponent';
import PerfumeSection from './components/PerfumeSection';
import Account from './components/Account';
import Exclusive from './components/Exclusive';
import Women from './components/Women';
import Men from './components/Men';
import ContactUs from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<><VideoComponent /><PerfumeSection /><Footer /></>} />
          <Route path="/account" element={<><Account /> <Footer/></>} />
          <Route path="/buyperfumes" element={<><Exclusive /> <Footer/></>} />
          <Route path="/women" element={<><Women/> <Footer/></>} />
          <Route path="/men" element={<><Men/> <Footer/></>} />
          <Route path="/contactus" element={<><ContactUs/> <Footer/></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
