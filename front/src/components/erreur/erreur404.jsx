import React from "react";
import classes from "./erreur404.module.css";
import image from "../../iconCouleurPrimary.png"

const Erreur404 = (props) => (
    <>
        <div className={classes.container__msg}>
            <p className={classes.container__p}>Erreur 4</p>
            <img className={classes.container__img} src={image} width="100px" alt="logo groupomania" />
            <p className={classes.container__p}>4</p>
        </div>
    </>
);

export default Erreur404;