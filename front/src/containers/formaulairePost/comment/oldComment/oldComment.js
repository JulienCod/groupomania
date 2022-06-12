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
            modify: false
        }
    }

    componentDidMount = async() => {
        const currentUser = AuthService.getCurrentUser().userId;
        await AuthService.getById(this.props.userId)
        .then(response => {
            if(response){
                this.setState({
                    avatar: response.data.avatar,
                    currentUser: currentUser
                })
            }
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
        console.log(commentId);
        this.setState({
            delete: true,
        })
        await CommentService.deleteComment(commentId);
    }


    render(){
        let options = "";
        if (this.props.userId === this.state.currentUser) {
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
        return (
            <div className={classes.commentaire__old}>
                <InfoUser avatar={this.state.avatar} mode={"comment"}/> 
                   {modify}               
                <div>
                    <FiHeart  onClick={this.like} className={classes.heart}/>
                    <span>10</span>
                </div>
            </div>
        );
    }
}

export default OldComment;