import React, { useContext } from "react"
import "./NavLinks.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import { AuthContext } from "../../context/auth-context"

const NavLinks = () => {
  const auth = useContext(AuthContext)
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <>
          <li>
            <NavLink to={auth.userId + "/places"}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
          <li>
            <button onClick={auth.logout}>LOGOUT</button>
          </li>
        </>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  )
}

export default NavLinks
