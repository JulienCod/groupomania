import React from "react";
import { NavLink } from "react-router-dom";

const NavAuth = (props) => (
    <nav>
        <ul className={props.cssUl}>
            <NavLink to="login" className={props.cssLi}>S'identifier</NavLink>
            <NavLink to="signup" className={props.cssLi}>S'inscrire</NavLink>
        </ul>
    </nav>
);

export default NavAuth;