import React from "react";
import { NavLink } from "react-router-dom";

const NavAuth = (props) => (
            <NavLink to={props.to} className={props.cssLi}>{props.children}</NavLink>
);

export default NavAuth;