import React, { useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";
import amoungUs from "./amounus.json";


//

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
function App() {
  const particlesInit = useCallback(main => {
    loadFull(main);
  }, [])


  const { authcheck, user } = useAuthContext()
  return (
    <div className="App">




      {authcheck && (
        <BrowserRouter>
          <Navbar />
          {user ? <Particles options={particlesOptions} init={particlesInit} /> :
            <Particles options={amoungUs} init={particlesInit} />}


          <Routes>

            <Route path='/' element={user ? <Home /> : <Navigate to="/login"></Navigate>} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/"></Navigate>} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/"></Navigate>} />
          </Routes>
        </BrowserRouter>
      )}

    </div>
  );
}

export default App;
