import React, {Component} from 'react';
import {FiHeart} from 'react-icons/fi';
import classes from "./oldComment.module.css";


class OldComment extends Component {

    render(){
        
        return (
            <div className={classes.commentaire__old}>
                <img src="images/profils/profils.png" width={"50px"} height={"50px"} alt="" />                            
                <p  className={classes.commentaire__text} >ceci est un ancien commentaire</p>
                <div>
                    <FiHeart onClick={this.like} className={classes.heart}/>
                    <span>10</span>
                </div>
            </div>
        );
    }
}

export default OldComment;