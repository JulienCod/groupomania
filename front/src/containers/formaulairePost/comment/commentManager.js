import React, {Component} from 'react';
import classes from "./commentManager.module.css";
import OldComment from './oldComment/oldComment';
import NewForm from '../newForm/newForm';
import {FiHeart} from 'react-icons/fi';
import {FaHeart} from 'react-icons/fa';
import PostService from '../../../services/postService';
import AuthService from '../../../services/authService';


class CommentManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listComments: [],
            postId: "",
            userId: "",
            loading: false,
            currentUser:"",
            displayComment : false,
            countLike:0,
            liked: false,
            listPost: [],
        }
    }
     componentDidMount = async() =>{
        let idPost = this.props.idPost
        let currentUser = AuthService.getCurrentUser().userId
        await PostService.getById(idPost)
        .then( response => {
            if(response) {    
                let listPost =response.data.likePosts   
                let findUserLike = listPost.find(user => user.userId === currentUser )
                let liked = false;
                if(findUserLike){
                    liked = findUserLike.liked;
                }
                let countLike = listPost.filter(like => like.liked)   
                this.setState({
                    postId:response.data.id,
                    userId: response.data.userId,
                    listComments :response.data.commentaires,
                    loading: false,
                    listPost: listPost,
                    currentUser: currentUser,
                    countLike : countLike.length,
                    liked:liked,
                })
            }
        })
    }
    handleCallback = async () =>{
        this.setState  ({
            loading: true,
        })
        await this.componentDidMount();
    }

    displayComment = () =>{
        let value = Boolean;
        
        if(this.state.displayComment){
            value = false;
        }else if(!this.state.displayComment){
            value = true;
        }
        this.setState({
            displayComment: value,
        })
    }

    like = async () => {
        let postId = this.state.postId;
        let liked = false;
        let findUserLike = this.state.listPost.find(user => user.userId === this.state.currentUser)
        let likeId ="";
        if(findUserLike){
            likeId = findUserLike.id
        }
        let data ={
            likeId:likeId,
            userId:this.state.currentUser,
            liked:liked
        }
        if(this.state.liked){
            likeId = findUserLike.id;
            liked= false;
            data={
                ...data,
                likeId: likeId
            }
            await PostService.likePost(postId, data);
            await this.componentDidMount();
        }else{
            liked = true;
            data={
                ...data,
                liked: liked
            }
            await PostService.likePost(postId, data)
            await this.componentDidMount();
        }
    }

    render(){
        let listComments = "";
        if(this.state.listComments.length > 0){
            listComments = this.state.listComments.map(comment =>{
                return (
                    <OldComment {...comment} key={comment.id} parentCallback={this.handleCallback}/>
                )
            })
            
        }
        let content ="";
        if(this.state.displayComment){
            content = (
                <>
                    <h3 className={classes.commentaire__title}>Commentaires</h3>
                    {listComments}
                    <NewForm status="comment" idPost={this.props.idPost} parentCallback={this.handleCallback}/>
                </>
            )
        }

        return (
            <section className={classes.commentaire__container}>
                <div className={classes.container__likeAndCom }>
                    <div onClick={this.displayComment} className={classes.container__com}>
                        <p >Commentaire</p>
                    </div>
                    <div className={classes.container__like}>
                        {
                        this.state.liked?
                        <FaHeart  onClick={this.like} className={classes.heartLiked}/>
                        :
                        <FiHeart  onClick={this.like} className={classes.heart}/>
                        }
                        <span>{this.state.countLike}</span>
                    </div>
                </div>
                {content}
            </section>
        );
    }
}

export default CommentManager;