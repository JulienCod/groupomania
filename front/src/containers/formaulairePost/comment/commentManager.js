import React, {Component} from 'react';
import classes from "./commentManager.module.css";
import OldComment from './oldComment/oldComment';
import NewForm from '../newForm/newForm';
// import CommentService from '../../../services/commentService';
import {FiHeart} from 'react-icons/fi';
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
        }
    }
    async componentDidMount(){
        let idPost = this.props.idPost
        let currentUser = AuthService.getCurrentUser().userId
        let findUserLike = this.props.listLike.find(user => user.userId === currentUser )
        let liked = false;
        if(findUserLike){
            liked = findUserLike.liked;
        }
        let listLiked = this.props.listLike.filter(like => like.liked)
        this.setState({
            loading: true,
            currentUser: currentUser,
            countLike : listLiked.length,
            liked:liked,
        })
        await PostService.getById(idPost)
        .then( response => {
            if(response) {          
                        this.setState({
                        postId:response.data.id,
                        userId: response.data.userId,
                        listComments :response.data.commentaires,
                        loading: false,
                    })
            }
        })

    }
     handleCallback = () =>{
        this.setState  ({
            loading: true,
        })
        this.componentDidMount();
        this.componentDidMount();
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
    like = () => {
        let postId = this.state.postId;
        let liked = false;
        let findUserLike = this.props.listLike.find(user => user.userId === this.state.currentUser)
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
            PostService.likePost(postId, data);
            this.componentDidMount();
        }else{
            liked = true;
            data={
                ...data,
                liked: liked
            }
            PostService.likePost(postId, data)
            this.componentDidMount();
        }
    }

    render(){
        let listComments = "";
        if(this.state.listComments.length > 0){
            listComments = this.state.listComments.map(comment =>{
                return (
                    <OldComment {...comment} key={comment.id}/>
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
                        <FiHeart onClick={this.like} className={classes.heart}/>
                        <span>{this.state.countLike}</span>
                    </div>
                </div>
                {content}
            </section>
        );
    }
}

export default CommentManager;