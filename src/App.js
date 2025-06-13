import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Home from './pages/Home';
import Layout from './pages/NavBar';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  };

  const handleUserUpdate = (data) => {
    setUser(data.user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  };

  const loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data);
        } else {
          handleLogout();
        }
      })
      .catch(error => console.log('api errors:', error));
  };

  useEffect(() => {
    loginStatus();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout user={user} loggedInStatus={isLoggedIn} />}
        >
          <Route index element={<Home loggedInStatus={isLoggedIn} user={user}/>} />
          <Route
            path="/signup"
            element={
              <LogIn
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
                signUp={true}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LogIn
                signUp={false}
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile user={user} handleUserUpdate={handleUserUpdate} handleLogout={handleLogout}/>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;