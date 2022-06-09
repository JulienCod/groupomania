import React, {Component} from 'react';

import classes from "./post.module.css";
import {FiHeart, FiPenTool} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId:"1",
            post:{
                user:{
                    userId:"1",
                    firstname : "Julien",
                    lastname : "Crutain",
                    avatar : "images/profils/profils.png",
                },
                postId : "",
                commentaire : "contenu textuel d'un post",
                image : "images/profils/profils.png",
                datePublication:"08/06/2022",
            },
            like: 10,
        }
    }
    componentDidMount = () => {

    }

    modifyPost = () => {
        console.log("modify");
    }

    deletePost = () => {
        console.log("delete");
    }
    like = () => {
        console.log("like")
    }

    render(){
        let currentUserId = this.state.currentUserId;
        let userId = this.state.post.user.userId;
        let options = "";
        if(currentUserId === userId){
            options = (
                <div className={classes.post__option}>
                    <FiPenTool title="Modify" onClick={this.modifyPost} className={classes.iconModify} />
                    <RiDeleteBin6Line title="Delete" onClick={this.deletePost} className={classes.iconDelete} />
                </div>
            )
        }

        return(
            <section className={classes.post} key={this.state.post.postId}>
                <div className={classes.post__info}>   
                    <div className={classes.post__info__user}>
                        <img src={this.state.post.user.avatar} width={"50px"} height={"50px"} alt="" />
                        <div>
                            <p>{this.state.post.user.firstname} {this.state.post.user.lastname}</p>
                            <p>Publié le {this.state.post.datePublication}</p>
                        </div>
                    </div>
                    {options}
                </div>
                <div>
                    <img src={this.state.post.image} width={"300px"} alt="" />
                    <p>{this.state.post.commentaire}</p>
                </div>
                <div>
                    <FiHeart onClick={this.like} className={classes.heart}/>
                    <span>{this.state.like}</span>
                </div>
            </section>
        )
    }
}

export default Post;