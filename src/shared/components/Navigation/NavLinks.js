// import React, { useContext } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

// import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  // const { isLoggedIn, logout, userId} = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/problems" exact>
          View Problems
        </NavLink>
      </li>
      <li>
        <NavLink to="/ul/problems">Your Desk</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Login</NavLink>
      </li>
      <li>
        <NavLink to="/learn-more">Learn More</NavLink>
      </li>

      {/* {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && <li>
        <NavLink to="/auth">LOG IN</NavLink>
      </li>}
      {isLoggedIn && (
          <li>
              <button onClick={logout}>LOGOUT</button>
          </li>
      )} */}
    </ul>
  );
};

export default NavLinks;
