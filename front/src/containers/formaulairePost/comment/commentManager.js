import React, {Component} from 'react';
import classes from "./commentManager.module.css";
import OldComment from './oldComment/oldComment';
import NewForm from '../newForm/newForm';
import CommentService from '../../../services/commentService';
import {FiHeart} from 'react-icons/fi';


class CommentManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listComments: [],
            postId: "",
            userId: "",
            loading: false,
            displayComment : false,
        }
    }
    async componentDidMount(){
        this.setState({
            loading: true,
        })
        let idPost = this.props.idPost
        await CommentService.getById(idPost)
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
        console.log("callback comment");
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
                        <span>{this.state.like}</span>
                    </div>
                </div>
                {content}
            </section>
        );
    }
}

export default CommentManager;