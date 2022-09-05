import React from "react";

import NavAuth from "../../components/nav/auth/navAuth";
import classes from "./home.module.css";

const Home = () => (
    <article className={classes.home__article}>
        <section className={classes.container}>
            <h1>Bienvenue sur Groupomania</h1>
            <div>
                <p>
                    Avec Groupomania, partagez et restez en contact avec vos collègues de travail.
                </p>
            </div>
            <div>
                <nav>
                    <ul className={classes.nav__ul}>
                        <NavAuth title="Connexion" to="login" cssLi={classes.nav__ul__li}>S'identifier</NavAuth>
                        <NavAuth title="S'enregistrer" to="signup" cssLi={classes.nav__ul__li}>S'enregistrer</NavAuth>
                    </ul>
                </nav>
            </div>
        </section>
        <section >
            <img src="images/logos/iconCouleurPrimary.png" className={classes.img} alt="logo groupomania"/>
        </section>
    </article>
);

export default Home;