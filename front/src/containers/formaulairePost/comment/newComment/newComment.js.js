import React, {Component} from 'react';
import classes from "./newComment.module.css";
import {FiSend} from 'react-icons/fi';



class NewComment extends Component {

    render(){

        return (
            <form className={classes.commentaire__form}>
                <img src="images/profils/profils.png" width={"50px"} height={"50px"} alt="" />
                <textarea  className={classes.newCommentaire__textarea} ></textarea>
                <FiSend onClick={this.submitCommentaire} className={classes.newPost__send}/>
            </form>
        );
    }
}

export default NewComment;