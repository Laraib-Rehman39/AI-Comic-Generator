import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ComicGenerator from './components/ComicGenerator';
import MyComics from './components/MyComics';
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyOTP from './components/VerifyOTP';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/generator" element={ <ProtectedRoute> <ComicGenerator /> </ProtectedRoute>}/>
        <Route path="/my-comics" element={ <ProtectedRoute> <MyComics /> </ProtectedRoute>}/>
        <Route path="/about" element={<About />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
}

export default App;