import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';

function App() {
  const [user,setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
   
      <Router>
        <Navbar user={user} />
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={user ? <Navigate to='/'/> : <Login />} />
        <Route exact path="/post/:id" element={user ? <Post /> : <Navigate to='/login'/>} />

      </Routes>
      </Router>
      
    
  );
}

export default App;
