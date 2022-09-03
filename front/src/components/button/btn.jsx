import React from "react";
import classes from './btn.module.css'

const Button = (props) => (

    <button className={classes.btn} onClick={props.clic}>{props.children}</button>

);

export default Button;