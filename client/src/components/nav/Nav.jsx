import React from "react";
import "./nav.css";

function Nav() {
  const toggleNavbar = () => {
      const nav = document.querySelector('.navbar-nav');
      if (nav.style.display === 'none' || nav.style.display === '') {
          nav.style.display = 'flex';
      } else {
          nav.style.display = 'none';
      }
  };

  return (
      <header>
          <nav className="navbar">
              <div className="container">
                  <a className="navbar-brand" href="/">AI•NomadNavigator</a>
                  {/* <button className="navbar-toggler" onClick={toggleNavbar}>☰</button> */}
                  <ul className="navbar-nav">
                      <li>
                        <a href="/">HOME</a>
                      </li>
                      <li>
                        <a href="/login">LOG IN</a>
                      </li>
                      <li>
                        <a href="/signup">SIGN UP</a>
                      </li>
                      

                  </ul>
              </div>
          </nav>
      </header>
  );
}

export default Nav;
