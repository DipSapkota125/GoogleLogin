import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({user}) => {

    const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
    };
    
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Dip Auth
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img src={user.photos[0].value} className="avatar" alt="home" />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link to="/login" className="link">
          Login
        </Link>
      )}
    </div>
  );
}

export default Navbar