import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Home from './pages/Home';
import Layout from './pages/NavBar';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', 
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  componentDidMount() {
    this.loginStatus()
  }

  render() {
    return (
     <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>}
          >
            <Route index element={<Home/>} />
            <Route
              path="/signup"
              element={
                <LogIn
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  signUp={true}
                />
              }
            />
            <Route
              exact path="/login"
              element={
                <LogIn
                  signUp={false}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              }
            />
            <Route
              exact path="/profile"
              element={<Profile user={this.state.user} handleLogin={this.handleLogin}/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
