import React, {Component} from 'react';
import {FiPenTool} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import ContainerPost from '../ContainerPost/ContainerPost';
import CommentManager from '../../comment/commentManager';
import classes from "./post.module.css";
import InfoUSer from "../../../infoUser/infoUser";
import PostService from '../../../../services/postService';
import ModifyForm from '../../modifyForm/modifyForm';


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: props.post.postId,
            delete:false,
            modify: false,
        }
    }
    componentDidMount(){
       
    }
    modifyPost = () => {
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

    deletePost = async () => {
        let postId = this.state.postId;
        this.setState({
            delete: true,
        })
        await PostService.deletePost(postId);
        
    }
    like = () => {
        console.log("like")
    }

    render(){
        let options = "";
        if (this.props.post.userId === this.props.currentUserId) {
            options = (
                <div className={classes.post__option}>
                    <FiPenTool title="Modifié" onClick={this.modifyPost} className={classes.iconModify} />
                    <RiDeleteBin6Line title="Supprimé" onClick={this.deletePost} className={classes.iconDelete} />
                </div>
            )
        }
        let modify = "";
        if(this.state.modify){
            modify=(
                <ModifyForm mode="post" {...this.props} />
            )
        }else{
            modify=(
                <ContainerPost image={this.props.post.image} description={this.props.post.description}/>
            )
        }

        let content="";
        if (!this.state.delete){
            content = (
                <article className={classes.post__container}>
                    <section className={classes.post} >
                        <div className={classes.post__info}>   
                            <InfoUSer mode="post" avatar={this.props.user.avatar} firstname={this.props.user.firstname} lastname={this.props.user.lastname} dataTime={this.props.post.datePublication} />
                            {options}
                        </div>
                        {modify}
                    </section>
                    <CommentManager display={this.state.displayComment} idPost={this.props.post.postId} />
                </article>
            )
        }

        return (
            <>
                {content}
            </>
        );
    }
}

export default Post;