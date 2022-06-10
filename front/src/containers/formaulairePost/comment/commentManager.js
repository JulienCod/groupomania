import React, {Component} from 'react';
import classes from "./commentManager.module.css";
import NewComment from './newComment/newComment.js';
import OldComment from './oldComment/oldComment';

class commentManager extends Component {

    render(){

        return (
            <section className={classes.commentaire}>
                <h3 className={classes.commentaire__title}>Commentaires</h3>
                <OldComment />
                <NewComment />
            </section>
        );
    }
}

export default commentManager;