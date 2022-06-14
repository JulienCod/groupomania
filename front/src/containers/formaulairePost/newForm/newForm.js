import React, {Component} from 'react';
import classes from "./newForm.module.css";
import {FiSend} from 'react-icons/fi';
import PostService from '../../../services/postService';
import Authservice from '../../../services/authService';
import commentService from '../../../services/commentService';


class NewForm extends Component {
    // constructeur du composant
    constructor(props) {
        super(props);
        this.state = {
            description : "",
            imagePreview : "",
            messageError: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fileInput = React.createRef();
    }
    componentDidMount = () => {
        this.setState  ({
            description : "",
            imagePreview : "",
            messageError: "",
        })
    }

    // gestion des changement sur le champ input
    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name] : event.target.value,
        })
    }
    //gestion du changement de l'image
    handleImageChange = (event) => {
        event.preventDefault();
        this.setState({ imagePreview: URL.createObjectURL(this.fileInput.current.files[0]) })
    }
    //envoi du formulaire post
    submitPost = async (event) => {
        event.preventDefault();
        let description = this.state.description;
        let image =  this.fileInput.current.files[0];
        let userId = Authservice.getCurrentUser().userId
        if(!image && !description){
           this.setState({ 
                messageError: "veuillez saisir un texte ou ajouter une image"
            })
        }else{
            let post = {
                userId : userId,
                description : description
            }
            await PostService.createPost(post, image);
            this.fileInput.current.value = null;
            this.props.parentCallback();
            this.componentDidMount();
        }
    }
    //envoi du formulaire commentaire
    submitCommentaire = async (event) =>{
        event.preventDefault();
        let description = this.state.description;
        let image =  this.fileInput.current.files[0];
        let userId = Authservice.getCurrentUser().userId
        if(!image && !description){
           this.setState({ 
                messageError: "veuillez saisir un texte ou ajouter une image"
            })
        }else{
            let comment = {
                userId : userId,
                description : description,
                postId : this.props.idPost
            }
            await commentService.createComment(comment, image);
            this.fileInput.current.value = null;
            this.props.parentCallback();
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
                <span>{this.state.messageError}</span>
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
                            <label htmlFor="textarea"></label>
                            <textarea
                            type="textarea"
                            name="description"
                            id="description" 
                            placeholder="Que voulez-vous dire ?"                       
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            className={classes.newPost__textArea} 
                            ></textarea>

                            <label htmlFor="picture"></label>
                            <input 
                            type="file" 
                            accept="image/*"
                            name="picture" 
                            id='picture' 
                            
                            ref={this.fileInput} 
                            onChange={this.handleImageChange}
                            />
                            {image}
                            <FiSend type="submit" onClick={this.submitPost} className={classes.newPost__send}/>
                        </form>
                        {error}
                    </section>
                </article>
            )
        }else if(status === "comment"){
            content = (
                <section>
                    <form className={classes.commentaire__form} method="post">
                        <img src="images/profils/profils.png" width={"50px"} height={"50px"} alt="" />
                        <label htmlFor="textarea"></label>
                        <textarea
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder='Écrivez un commentaire ...'                        
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        className={classes.newCommentaire__textarea}
                        ></textarea>

                        <label htmlFor="picture"></label>
                        <input 
                        type="file" 
                        accept="image/*"
                        name="picture" 
                        id='picture' 
                        ref={this.fileInput} 
                        onChange={this.handleImageChange}
                        />
                        {image}
                        <FiSend onClick={this.submitCommentaire} className={classes.newPost__send}/>
                    </form>
                    {error}
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