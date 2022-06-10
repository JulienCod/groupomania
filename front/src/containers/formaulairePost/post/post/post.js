import React from "react";
import classes from "./post.module.css"

const Post = (props) => {
    let image = "";
    if(props.image){
        image =(
            <div className={classes.container__img}>
                <img className={classes.img} src={props.image} alt="" />
            </div>
        )
    }
    return(
        <div className={classes.container__description}>
            {image}
            <p className={classes.description}>{props.description}</p>
        </div>
    )
};

export default Post;