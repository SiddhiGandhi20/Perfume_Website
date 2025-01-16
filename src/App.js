import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import VideoComponent from './components/VideoComponent';
import PerfumeSection from './components/PerfumeSection';
import Account from './components/Account';
import Exclusive from './components/Exclusive';
import ExclusiveDetails from './components/ExclusiveDetails';
import WomenDetails from './components/WomenDetails';
import Women from './components/Women';
import Men from './components/Men';
import ContactUs from './components/ContactForm';
import AboutUs from './components/About';
import BestSellers from './components/BestSellers';
import Cart from './components/Cart';
import ExclusiveSection from './components/ExclusiveSection'
import WomenSection from './components/WomenSection';
import MenSection from './components/MenSection';
import MenDetails from './components/MenDetails';
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<><VideoComponent /><BestSellers/><PerfumeSection /> <Footer/></>} />
          <Route path="/account" element={<><Account /> <Footer/></>} />
          <Route path="/buyperfumes" element={<><Exclusive cart={cart} setCart={setCart} /><ExclusiveSection/> <Footer/></>} />
          <Route path="/details/:id" element={<ExclusiveDetails cart={cart} setCart={setCart}/>} />
          <Route path="/women" element={<><Women cart={cart} setCart={setCart}/> <WomenSection/><Footer/></>} />
          <Route path="/detailsW/:id" element={<WomenDetails cart={cart} setCart={setCart}/>}/>
          <Route path="/men" element={<><Men cart={cart} setCart={setCart}/><MenSection/> <Footer/></>} />
          <Route path="/detailsM/:id" element={<MenDetails cart={cart} setCart={setCart} />}/>
          <Route path="/contactus" element={<><ContactUs/> <Footer/></>} />
          <Route path="/about" element={<><AboutUs/> <Footer/></>} />
          <Route path="/cart" element={<><Cart cartItems={cart} setCart={setCart} /> <Footer/></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
