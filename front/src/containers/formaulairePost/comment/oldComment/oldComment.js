import React, {Component} from 'react';
import {FiHeart, FiPenTool} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import InfoUser from '../../../infoUser/infoUser';
import classes from "./oldComment.module.css";
import AuthService from '../../../../services/authService';
import CommentService from '../../../../services/commentService';
import ModifyForm from '../../modifyForm/modifyForm';


class OldComment extends Component {
    constructor(props) {
        super(props)
        this.state={
            avatar: "",
            modify: false,
            delete: false,
            countLike:0,
            liked: false,
        }
    }

    componentDidMount = async() => {
        let currentUser = AuthService.getCurrentUser().userId
        const user = AuthService.getCurrentUser();
        await CommentService.getById(this.props.id)
        .then(comment => {
            this.setState({
                commentId:comment.data.id,
                postId: comment.data.postId,
                likeComments: comment.data.likeComments
            })
        })
        await AuthService.getById(this.props.userId)
        .then(response => {
            if(response){
                this.setState({
                    avatar: response.data.avatar,
                    currentUser: user.userId,
                    admin: user.admin
                })
            }
        })
        let findUserLike = this.state.likeComments.find(user => user.userId === currentUser )
        let liked = false;
        if(findUserLike){
            liked = findUserLike.liked;
        }
        let listLiked = this.state.likeComments.filter(like => like.liked)
        this.setState({
            loading: true,
            currentUser: currentUser,
            countLike : listLiked.length,
            liked:liked,
        })
    }

    modifyComment = async() => {
        let value = Boolean
        if(this.state.modify){
            value = false;
        }else if(!this.state.modify){
            value = true;
        }
        this.setState({
            modify: value,
        })
    }

    deleteComment = async() => {
        let commentId = this.props.id;
        this.setState({
            delete: true,
        })
        await CommentService.deleteComment(commentId);
    }

    like = () => {
        let commentId = this.state.commentId;
        let liked = false;
        let findUserLike = this.state.likeComments.find(user => user.userId === this.state.currentUser)
        let likeId ="";
        if(findUserLike){
            likeId = findUserLike.id
        }
        let data ={
            likeId:likeId,
            userId:this.state.currentUser,
            liked:liked,
            postId:this.state.postId
        }
        if(this.state.liked){
            likeId = findUserLike.id;
            liked= false;
            data={
                ...data,
                likeId: likeId
            }
            CommentService.likePost(commentId, data);
            this.componentDidMount();
        }else{
            liked = true;
            data={
                ...data,
                liked: liked
            }
            CommentService.likePost(commentId, data)
            this.componentDidMount();
        }
    }


    render(){
        let options = "";
        if (this.props.userId === this.state.currentUser || this.state.admin) {
            options = (
                <div className={classes.post__option}>
                    <FiPenTool title="Modifié" onClick={this.modifyComment} className={classes.iconModify} />
                    <RiDeleteBin6Line title="Supprimé" onClick={this.deleteComment} className={classes.iconDelete} />
                </div>
            )
        }
        let image = "";
        if (this.props.image){
            image = (
                        <img src={this.props.image} width={"50px"} height={"50px"} alt="" />
                    )
        }
        let modify = "";
        if(this.state.modify){
            modify=(
                <ModifyForm mode="comment" {...this.props} />
            )
        }else{
            modify=(
                <div className={classes.comment}>
                    {image}
                    <p  className={classes.commentaire__text} >{this.props.description}</p>
                    {options}
                </div>   
            )
        }
        let content ="";
        if(!this.state.delete){
            content =(
                <div className={classes.commentaire__old}>
                <InfoUser avatar={this.state.avatar} mode={"comment"}/> 
                   {modify}               
                <div>
                    <FiHeart  onClick={this.like} className={classes.heart}/>
                    <span>{this.state.countLike}</span>
                </div>
            </div>
            )
        }
        return (
            <>
                {content}
            </>
        );
    }
}

export default OldComment;