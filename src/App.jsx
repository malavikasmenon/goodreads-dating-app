import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfileSwipe from './pages/ProfileSwipe';
import Matches from './pages/Matches';
import { AuthProvider } from './context/AuthContext';
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app min-h-screen bg-gray-100">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/swipe" element={<ProfileSwipe />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
