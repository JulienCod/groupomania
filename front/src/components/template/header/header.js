import React from "react";
import Image from "../../image/image";
import classes from "./header.module.css"
import NavAuth from "../../nav/auth/navAuth"

const Header = (props) => {
    // let url = new URL(window.location.href).pathname;
    // let id = url.split('/')[1]  
    // console.log(id);
    return <header className={classes.header}>
                <div className={classes.header__container}>
                    <Image src= "images/logos/icon-left-font-monochrome-white.png" alt="logo groupomania" cssContainer={classes.container__img} cssImage={classes.img} />
                    <nav>
                        <ul>
                            <NavAuth to="login" cssLi={classes.nav__ul__li}>S'identifier</NavAuth>
                            <NavAuth to="signup" cssLi={classes.nav__ul__li}>S'enregistrer</NavAuth>
                        </ul>
                    </nav>
                </div>
            </header>
};

export default Header;