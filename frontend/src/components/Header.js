import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import logoPath from '../images/logo.svg';

function Header({ headerEmail, onExit }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Logo" />

      <Routes>
        <Route path="/sign-in" element={
          <Link to="/sign-up" className="header__link">Register</Link>
        } />

        <Route path="/sign-up" element={
          <Link to="/sign-in" className="header__link">Login</Link>
        } />

        <Route exect path="/" element={
          <div className="header__container">
            <p className="header__email">{headerEmail}</p>
            <Link to="/sign-in" className="header__link" onClick={onExit}>Exit</Link>
          </div>
        } />
      </Routes>

    </header>
  );
}

export default Header;
