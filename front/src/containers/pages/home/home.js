import React from "react";
// import Image from "../../../components/image/image";
import NavAuth from "../../../components/nav/auth/navAuth";
import classes from "./home.module.css";

const Home = (props) => (
    
    <article className={classes.container}>
        <section>
            <h1>Bienvenue sur Groupomania</h1>
            <div>
                <p>
                    Avec Groupomania, partagez et restez en contact avec vos collègues de travail.
                </p>
            </div>
            <div>
                <NavAuth />
            </div>
        </section>
        <section>
            {/* <Image src="images/logos/icon-above-font.png"  alt="logo groupomania"/> */}
        </section>
    </article>
);

export default Home;