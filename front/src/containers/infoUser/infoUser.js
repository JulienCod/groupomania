import React from "react";
import classes from "./infoUser.module.css"

const infoUser = (props) => {
    if (props.mode === "comment") {
        return (
            <div className={classes.post__info__user}>
                <img src={props.avatar} width={"50px"} height={"50px"} alt={props.firstname} />
                <div>
                    <p>{props.firstname} {props.lastname}</p>
                    <p>Publié le {props.dataTime}</p>
                </div>
            </div>
        )
    }else if (props.mode === "post"){
        return (
            <div className={classes.post__info__user}>
                <img src={props.avatar} width={"50px"} height={"50px"} alt={props.firstname} />
                <div>
                    <p>{props.firstname} {props.lastname}</p>
                    <p>Publié le {props.dataTime}</p>
                </div>
            </div>
        )
    }

};

export default infoUser;