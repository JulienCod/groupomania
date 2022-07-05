import React from "react";
import classes from './btn.module.css'

const Button = (props) => (

    <button type={props.type} className={classes.btn} onClick={props.clic}>{props.children}</button>

);

export default Button;