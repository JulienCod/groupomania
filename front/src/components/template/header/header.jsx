import React, { useState, useEffect } from "react";
import Image from "../../image/image";
import classes from "./header.module.css"
import NavAuth from "../../nav/auth/navAuth"
import AuthService from "../../../services/authService";
import { GrLogout } from "react-icons/gr"
import { Link } from "react-router-dom";

const Header = () => {
    const [userId, setUserId] = useState(AuthService.getCurrentUser());
    const [lastname, setLastname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState(false);

    useEffect(() => {
        if (userId) {
            AuthService.getById(userId)
                .then((response) => {
                    if (response) {
                        setLastname(response.data.lastname);
                        setAvatar(response.data.avatar);
                        setUser(true);
                    }
                })
        }
    }, [])

    return <header className={classes.header}>
        <div className={classes.header__container}>
            {user ?
                <>
                    <Link to="groupomania" title="fil d'actualité">
                        <Image src="images/logos/icon-left-font-monochrome-white.png" alt="image groupomania" cssContainer={classes.container__img} cssImage={classes.img} />
                    </Link>
                    <div className={classes.nav__container__login}>
                        <Link title="Profils" to="profils"><img src={avatar} width={"50px"} alt={`Image de profils de ${lastname}`} /></Link>
                        <GrLogout title="Déconnexion" className={classes.logout} onClick={AuthService.logout} />
                    </div>
                </>
                :
                <>
                    <Image src="images/logos/icon-left-font-monochrome-white.png" alt="image groupomania" cssContainer={classes.container__img} cssImage={classes.img} />

                    <div className={classes.nav__container}>
                        <nav>
                            <ul className={classes.nav__ul}>
                                <NavAuth title="Connexion" to="login" cssLi={classes.nav__ul__li}>S'identifier</NavAuth>
                                <NavAuth title="S'enregistrer" to="signup" cssLi={classes.nav__ul__li}>S'enregistrer</NavAuth>
                            </ul>
                        </nav>
                    </div>
                </>
            }
        </div>
    </header>
};

export default Header;