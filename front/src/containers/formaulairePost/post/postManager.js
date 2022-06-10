import React, {Component} from 'react';
import classes from "./postManager.module.css";
import {FiHeart, FiPenTool} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import PostService from '../../../services/postService';
import InfoUSer from "../../infoUser/infoUser";
import Post from './post/post';
import CommentManager from '../comment/commentManager';
import NewForm from '../newForm/newForm';

class PostManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPost:[],
            currentUserId:"1",
            post:{
                user:{
                    userId:"1",
                    firstname : "Julien",
                    lastname : "Crutain",
                    avatar : "images/profils/profils.png",
                },
                postId : "",
                description : "contenu textuel d'un post",
                image : "images/profils/profils.png",
                datePublication:"08/06/2022",
            },
            like: 10,
            loading:false,
        }
    }
    componentDidMount = () => {
        this.setState  ({
            loading: true,
        })
        PostService.getAll()
        .then(response => {
            if (response) {
                const listPost = response.data.map(post => {
                    return {
                        post: {
                            postId: post.id,
                            description: post.description,
                            image: post.image,
                            datePublication : post.createdAt,
                            userId: post.userId,
                        },
                        user:{
                            userId: post.user.id,
                            firstname: post.user.firstname,
                            lastname: post.user.lastname,
                            avatar: post.user.avatar,
                        },
                    }
                })
                this.setState({
                    listPost,
                    loading:false,
                })
            }
        })
           
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

     handleCallback = () => {
        console.log("callback");
        this.componentDidMount();
        this.componentDidMount();
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
        let listPost ="";
        listPost = this.state.listPost.map(post => {
            return(
                <article className={classes.post__container} key={post.post.postId}>
                    <section className={classes.post} >
                        <div className={classes.post__info}>   
                            <InfoUSer mode="post" avatar={post.user.avatar} firstname={post.user.firstname} lastname={post.user.lastname} dataTime={post.post.datePublication} />
                            {options}
                        </div>
                        <Post image={post.post.image} description={post.post.description}/>
                        <div>
                            <FiHeart onClick={this.like} className={classes.heart}/>
                            <span>{this.state.like}</span>
                        </div>
                    </section>
                    <CommentManager idPost={post.post.postId} />
                </article>
            )
        })

      

        return(
            <>
                <NewForm parentCallback={this.handleCallback} status="post"/>
                {listPost}
            </>
        )
    }
}

export default PostManager;