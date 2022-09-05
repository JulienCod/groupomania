import React from "react";
import classes from "./erreur.module.css";

const Erreur = (props) => (
        <article className={classes.container}>
            {props.children}
        </article>
);

export default Erreur;