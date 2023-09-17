import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./nav.css";

function Nav() {
  const { isAuthenticated, logout, user } = useAuth0();
  
  // Get email from sessionStorage
  const userEmail = sessionStorage.getItem('userEmail');
  
  const toggleNavbar = () => {
      const nav = document.querySelector('.navbar-nav');
      if (nav.style.display === 'none' || nav.style.display === '') {
          nav.style.display = 'flex';
      } else {
          nav.style.display = 'none';
      }
  };

  const handleLogout = () => {
      if (userEmail) {
          // Remove email from sessionStorage on logout
          sessionStorage.removeItem('userEmail');
      }
      logout({ returnTo: window.location.origin });
      window.location.reload();
  };

  return (
      <header>
          <nav className="navbar">
              <div className="container">
                  <a className="navbar-brand" href="/">AI•NomadNavigator</a>
                  {/* <button className="navbar-toggler" onClick={toggleNavbar}>☰</button> */}
                  <ul className="navbar-nav">
                      { (isAuthenticated || userEmail) ? (
                          <li>
                              <a href="#" onClick={handleLogout}>LOGOUT</a>
                          </li>
                      ) : (
                          <>
                              <li>
                                  <a href="/">HOME</a>
                              </li>
                              <li>
                                  <a href="/login">LOG IN</a>
                              </li>
                              <li>
                                  <a href="/signup">SIGN UP</a>
                              </li>
                          </>
                      )}
                  </ul>
              </div>
          </nav>
      </header>
  );
}

export default Nav;
