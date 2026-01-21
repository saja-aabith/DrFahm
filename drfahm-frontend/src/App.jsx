import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Level from './components/Level';
import LevelComplete from './components/LevelComplete';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import './index.css';

// API Base URL
const API_URL = 'http://localhost:5001';

// Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Configure axios defaults
axios.defaults.baseURL = API_URL;

// Axios interceptor to add JWT token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios response interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        fetchUserProfile();
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/user/profile');
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response && error.response.status === 401) {
        logout();
      }
    }
  };

  const login = (userData, token) => {
    console.log('Login called with token:', token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading DrFahm...</h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUserProfile, API_URL }}>
      <Router>
        <Routes>
          {/* Landing Page (Homepage) */}
          <Route 
            path="/" 
            element={!user ? <HomePage /> : <Navigate to="/dashboard" />} 
          />
          
          {/* Login */}
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/dashboard" />} 
          />
          
          {/* Dashboard */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/" />} 
          />
          
          {/* Level Gameplay */}
          <Route 
            path="/level/:world/:level" 
            element={user ? <Level /> : <Navigate to="/" />} 
          />
          
          {/* Level Complete */}
          <Route 
            path="/level-complete" 
            element={user ? <LevelComplete /> : <Navigate to="/" />} 
          />
          
          {/* Leaderboard */}
          <Route 
            path="/leaderboard" 
            element={user ? <Leaderboard /> : <Navigate to="/" />} 
          />
          
          {/* Profile */}
          <Route 
            path="/profile" 
            element={user ? <Profile /> : <Navigate to="/" />} 
          />
          
          {/* Catch all - redirect to homepage */}
          <Route 
            path="*" 
            element={<Navigate to="/" />} 
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;