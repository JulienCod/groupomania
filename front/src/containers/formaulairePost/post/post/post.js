import React from "react";

const Post = (props) => (
    <div>
        <img src={props.image} width={"300px"} alt="" />
        <p>{props.description}</p>
    </div>
);

export default Post;