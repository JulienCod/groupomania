import React from "react";
import Image from "../../image/image";
import classes from "./containerPost.module.css"

const ContainerPost = (props) => {
    let image = "";
    if(props.image){
        image =(
            <Image cssContainer={classes.container__img} src={props.image} cssImage={classes.img} alt={"image post"}/>
        )
    }
    return(
        <div className={classes.container__description}>
            {image}
            <p className={classes.description}>{props.description}</p>
        </div>
    )
};

export default ContainerPost;