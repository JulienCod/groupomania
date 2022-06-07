import React from "react";
import Image from "../../image/image";
import classes from "./header.module.css"
import NavAuth from "../../nav/auth/navAuth"

const Header = (props) => (
    <header className={classes.container}>
        <Image src= "images/logos/icon-left-font.png" alt="logo groupomania" cssContainer={classes.container__img} cssImage={classes.img} />
        <NavAuth cssUl={classes.nav__ul} cssLi={classes.nav__ul__li} />
    </header>
);

export default Header;