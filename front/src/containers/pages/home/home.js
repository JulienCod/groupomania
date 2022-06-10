import React from "react";
import Image from "../../../components/image/image";

import NavAuth from "../../../components/nav/auth/navAuth";
import classes from "./home.module.css";

const Home = (props) => (
    <article >
        <section className={classes.container}>
            <h1>Bienvenue sur Groupomania</h1>
            <div>
                <p>
                    Avec Groupomania, partagez et restez en contact 
                </p>
                <p>
                    avec vos collègues de travail.
                </p>
            </div>
            <div>
                <nav>
                    <ul>
                        <NavAuth to="login" cssLi={classes.nav__ul__li}>S'identifier</NavAuth>
                        <NavAuth to="signup" cssLi={classes.nav__ul__li}>S'enregistrer</NavAuth>
                    </ul>
                </nav>
            </div>
        </section>
        <section>
            <Image src="images/logos/icon-above-font.png"  alt="logo groupomania"/>
        </section>
    </article>
);

export default Home;