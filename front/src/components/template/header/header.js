import React from "react";
import Image from "../../image/image";
import classes from "./header.module.css"
import NavAuth from "../../nav/auth/navAuth"

const Header = (props) => (
    <header className={classes.header}>
        <div className={classes.header__container}>
            <Image src= "images/logos/icon-left-font-monochrome-white.png" alt="logo groupomania" cssContainer={classes.container__img} cssImage={classes.img} />
            <NavAuth cssUl={classes.nav__ul} cssLi={classes.nav__ul__li} />
        </div>
    </header>
);

export default Header;