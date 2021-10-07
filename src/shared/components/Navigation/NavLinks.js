import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/problems" exact>
          View All Problems
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to="/users">View All Users</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/a1/problems">Your Desk</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/problems/new">Add Problem</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/learn-more">Learn More</NavLink>
      </li>
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
