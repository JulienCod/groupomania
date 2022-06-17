import React from "react";
import Image from "../../image/image";
import classes from "./header.module.css"
import NavAuth from "../../nav/auth/navAuth"
import AuthService from "../../../services/authService";
import {GrLogout} from "react-icons/gr"
import { Link } from "react-router-dom";

const Header = (props) => {
    const user = AuthService.getCurrentUser();

    let content = "";
    if (user){
        content = (
            <>
                <Link to="groupomania" title="fil d'actualité">
                        <Image src= "images/logos/icon-left-font-monochrome-white.png" alt="logo groupomania" cssContainer={classes.container__img} cssImage={classes.img} />
                </Link>
                <div className={classes.nav__container__login}>
                    <Link title="Profils" to="profils"><img src={user.avatar} width={"50px"} alt={`Image de profils de ${user.lastname}`} /></Link>
                    <GrLogout title="Déconnexion" className={classes.logout} onClick={AuthService.logout}/>
                </div>
            </>
        )
    }else{
        content = (
            <>
                <Image src= "images/logos/icon-left-font-monochrome-white.png" alt="logo groupomania" cssContainer={classes.container__img} cssImage={classes.img} />

                <div className={classes.nav__container}>
                    <nav>
                        <ul className={classes.nav__ul}>
                            <NavAuth title="Connexion" to="login" cssLi={classes.nav__ul__li}>S'identifier</NavAuth>
                            <NavAuth title="S'enregistrer" to="signup" cssLi={classes.nav__ul__li}>S'enregistrer</NavAuth> 
                        </ul>
                    </nav>
                </div>                
            </>
        )
    }
    return <header className={classes.header}>
                <div className={classes.header__container}>
                    {content}        
                </div>       
            </header>
};

export default Header;