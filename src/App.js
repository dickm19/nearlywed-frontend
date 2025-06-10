import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/NavBar';
import SignUp from './pages/SignUp';
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
                <SignUp
                  history={this.props.history}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              }
            />
            <Route
              exact path="/login"
              element={
                <LogIn
                  history={this.props.history}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
