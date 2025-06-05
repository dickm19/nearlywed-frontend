import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Layout from './pages/NavBar';
import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/"element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="signup" element={<SignUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
