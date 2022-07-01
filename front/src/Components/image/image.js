import React from "react";

const Image = (props) => (
    <div className={props.cssContainer}>
        <img src={props.src} alt={props.alt} className={props.cssImage}/>
    </div>
);

export default Image;