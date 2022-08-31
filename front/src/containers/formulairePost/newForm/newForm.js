import React, {Component} from 'react';
import classes from "./newForm.module.css";
import {FiSend} from 'react-icons/fi';
import PostService from '../../../services/postService';
import Authservice from '../../../services/authService';
import commentService from '../../../services/commentService';
import AuthService from '../../../services/authService';
import  {formValidationComment, formValidationPost} from '../../../services/formValidation';
import resizeFile from '../../../services/resizeFile';


class NewForm extends Component {
    // constructeur du composant
    constructor(props) {
        super(props);
        this.state = {
            descriptionPost : "",
            descriptionComment : "",
            imagePreview : "",
            messageError: "",
            avatarCurrentUser:"",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fileInput = React.createRef();
    }
    componentDidMount = () => {
        let avatarCurrentUser = AuthService.getCurrentUser().avatar
        this.setState  ({
            descriptionPost : "",
            descriptionComment : "",
            imagePreview : "",
            messageError: "",
            avatarCurrentUser: avatarCurrentUser
        })
    }

    // management field
    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name] : event.target.value,
        })
    }
    //management picture
    handleImageChange = (event) => {
        event.preventDefault();
        this.setState({ imagePreview: URL.createObjectURL(this.fileInput.current.files[0]) })
    }
    //send form post
    submitPost = async (event) => {
        event.preventDefault();
        let description = this.state.descriptionPost;
        let file = this.fileInput.current.files[0];
        let image = await resizeFile.social(file);
        let post = {
            description : description
        }
        const errorform = formValidationPost(post);
        
        if(!description && !image) {
            this.setState({
                messageError: "Le post doit contenir au minimum une image ou du texte"
            })
        }else if (errorform.error) {
            this.setState({
                messageError: errorform.error.details[0].message
            })
        }else{
            await PostService.createPost(post, image);
            this.fileInput.current.value = null;
            await this.props.parentCallback();
            this.componentDidMount();
        }
        
    }
    //send form comment
    submitCommentaire = async (event) =>{
        event.preventDefault();
        let description = this.state.descriptionComment;
        let file = this.fileInput.current.files[0];
        let image = await resizeFile.social(file);
        let comment = {
            description : description,
            postId : this.props.idPost
        }
        const errorform = formValidationComment(comment);
        if(!description && !image) {
            this.setState({
                messageError: "Le commentaire doit contenir au minimum une image ou du texte"
            })
        }else if (errorform.error) {
            this.setState({
                messageError: errorform.error.details[0].message
            })
        }else{
            await commentService.createComment(comment, image);
            this.fileInput.current.value = null;
            await this.props.parentCallback();
            this.componentDidMount();
        }
    }
    render(){
        let image = "";
        if(this.state.imagePreview){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.imagePreview} width="100px" alt="" className={classes.image} />
                </div>    
            )
        }
        let error = "";
        if(this.state.messageError){
            error = (
                <span className={classes.error}>{this.state.messageError}</span>
            )
        }
        let status = this.props.status;
        let content ="";
        if  (status === "post"){
            content = (
                <article className={classes.newPost__container}>
                    <section className={classes.newPost}>
                        <h2>Exprimez-vous ...</h2>
                        <form className={classes.newPost__form} method="post">
                            <textarea
                            type="textarea"
                            name="descriptionPost"
                            id="descriptionPost" 
                            placeholder="Que voulez-vous dire ?"                       
                            value={this.state.descriptionPost}
                            onChange={this.handleInputChange}
                            className={classes.newPost__textArea} 
                            ></textarea>
                            {error}
                            <input 
                            type="file" 
                            accept="image/*"
                            name="picturePost" 
                            id='picturePost' 
                            className={classes.inputfile}
                            ref={this.fileInput} 
                            onChange={this.handleImageChange}
                            />
                            <label htmlFor="picturePost">Sélectionner une image</label>
                            <div className={classes.img__send}>
                                {image}
                                <FiSend title="envoyé" type="submit" onClick={this.submitPost} className={classes.newPost__send}/>
                            </div>
                        </form>
                    </section>
                </article>
            )
        }else if(status === "comment"){
            content = (
                <section className={classes.newCommentaire}>
                    <form className={classes.commentaire__form} method="post">
                        <img src={this.state.avatarCurrentUser} width={"50px"} height={"50px"} alt="" />
                        <textarea
                        type="textarea"
                        name="descriptionComment"
                        id="descriptionComment"
                        placeholder='Écrivez un commentaire ...'                        
                        value={this.state.descriptionComment}
                        onChange={this.handleInputChange}
                        className={classes.newCommentaire__textarea}
                        ></textarea>
                        {error}
                        <input 
                        type="file" 
                        accept="image/*"
                        name="pictureComment" 
                        id='pictureComment' 
                        className={classes.inputfile}
                        ref={this.fileInput} 
                        onChange={this.handleImageChange}
                        />
                        <label htmlFor="pictureComment">Sélectionner une image</label>
                        <div className={classes.comment__img__send}>
                            {image}
                            <FiSend title="envoyé" type="submit" onClick={this.submitCommentaire} className={classes.newPost__send}/>
                        </div>
                    </form>
                </section>
            )
        }
        return (
            <>
                {content}
            </>
        );
    }
}

export default NewForm;