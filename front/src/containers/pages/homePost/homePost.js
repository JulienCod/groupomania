import React, {Component} from 'react';
import classes from './homePost.module.css';
import {RiCloseCircleLine} from 'react-icons/ri';
import NewPost from '../../formaulairePost/newPost/newPost';
import Post from '../../formaulairePost/post/post';
import CommentManager from '../../formaulairePost/comment/commentManager';

class HomePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            welcome : true
        }
    }
    componentDidMount = () => {

    }

    closeWelcome = () =>{
        this.setState({
            welcome : false
        })
    }

    submitPost = () => {
        console.log("envoi du post");
    }

    

   

    
    submitCommentaire = () => {
        console.log("commentaire");
    }
    render(){  
        let welcome = this.state.welcome;
        let welcomeContent = "";
        if (welcome) {
            welcomeContent = (
                <div>
                    <span>Bienvenue Julien</span>
                    <RiCloseCircleLine onClick={this.closeWelcome} className={classes.closeWelcome}/>
                </div>
            )
        }

        return (
            <>
                {welcomeContent}
                <NewPost />

                <article className={classes.post__container}>
                   <Post />
                   <CommentManager />
                </article>
            </>
        );
    }
}

export default HomePost;