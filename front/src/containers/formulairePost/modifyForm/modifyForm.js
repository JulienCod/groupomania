import React, {Component} from 'react';
import classes from './modifyForm.module.css';
import {FiSend} from 'react-icons/fi';
import PostService from '../../../services/postService';
import CommentService from '../../../services/commentService';
import { formModifyValidation } from '../../../services/formValidation';
import resizeFile from '../../../services/resizeFile';

class ModifyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description:"",
            image: "",
            imagePreview:"",
            mode: "",
            messageError: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fileInput = React.createRef();
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
    componentDidMount() {
        const mode = this.props.mode;
        if (mode ==="post") {
            const postId = this.props.post.postId
            PostService.getById(postId)
            .then(response =>{
                this.setState({
                    description: response.data.description,
                    image: response.data.image,
                    mode: mode,
                    messageError: "",
                })
            })            
        } else if(mode ==="comment"){
            this.setState({
                description: this.props.description,
                image: this.props.image,
                mode: mode,
                messageError: "",
            })
        }
    }
    submitModifyPost = async (event) => {
        event.preventDefault();
        const postId = this.props.post.postId;
        let file = this.fileInput.current.files[0];
        let image = await resizeFile.social(file);
        let post = {
            description : this.state.description,
        }

        
        const errorform = formModifyValidation(post);
        
        if(!this.state.description && !image) {
            this.setState({
                messageError: "Le post doit contenir au minimum une image ou du texte"
            })
        }else if (errorform.error) {
            this.setState({
                messageError: errorform.error.details[0].message
            })
        }else{
            await PostService.modifyPost(postId, post, image);
            await this.props.parentCallback();
            this.componentDidMount();
        }
    }
    submitModifyComment = async (event) => {
        event.preventDefault();
        const commentId = this.props.id;
        let file = this.fileInput.current.files[0];
        let image = await resizeFile.social(file);
        let comment = {
            description : this.state.description,
        }
        
        const errorform = formModifyValidation(comment);
        
        if(!this.state.description && !image) {
            this.setState({
                messageError: "Le commentaire doit contenir au minimum une image ou du texte"
            })
        }else if (errorform.error) {
            this.setState({
                messageError: errorform.error.details[0].message
            })
        }else{
            await CommentService.modifyComment(commentId, comment, image);
            await this.props.parentCallback();
            this.componentDidMount();
        }
    }

    render(){
        let image = "";
        if(this.state.imagePreview){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.imagePreview} width="100px" alt={this.state.imagePreview} className={classes.image} />
                </div>    
            )
        }else if(this.state.image){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.image} width="100px" alt="" className={classes.image} />
                </div>    
            )
        }
        let error ="";
        if (this.state.messageError) {
            error = (
                <span className={classes.error}>{this.state.messageError}</span>
            )
        }
        let content ="";
        if(this.state.mode === "post"){
            content = (
                <div className={classes.form__container}>
                    <form className={classes.form} method="post">
                            <textarea
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder='Écrivez un commentaire ...'                        
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            className={classes.modifyPost__textarea}
                            ></textarea>
                            {error}
                            <div className={classes.input_img_send}>
                                <input 
                                type="file" 
                                accept="image/*"
                                name="pictureModifyPost" 
                                id='pictureModifyPost' 
                                ref={this.fileInput} 
                                className={classes.inputfile}
                                onChange={this.handleImageChange}
                                />
                                <label htmlFor="pictureModifyPost">Sélectionner une image</label>
                                    {image}
                                <div className={classes.send}>
                                    <FiSend title="Envoyer" onClick={this.submitModifyPost} className={classes.modify__send}/>
                                </div>
                            </div>
                        </form>
                </div>
            )
        }else if (this.state.mode === "comment"){
            content = (
                <div className={classes.form__container}>
                    <form className={classes.form} method="post">
                        <label htmlFor="textarea"></label>
                        <textarea
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder='Écrivez un commentaire ...'                        
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        className={classes.modifyCommentaire__textarea}
                        ></textarea>
                        {error}
                        <input 
                        type="file" 
                        accept="image/*"
                        name="pictureModifyComment" 
                        id='pictureModifyComment' 
                        className={classes.inputfile}
                        ref={this.fileInput} 
                        onChange={this.handleImageChange}
                        />
                        <label htmlFor="pictureModifyComment">Sélectionner une image</label>
                        <div className={classes.modify__img__send}>
                            {image}
                            <FiSend onClick={this.submitModifyComment} className={classes.modify__send}/>
                        </div>

                    </form>
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

export default ModifyForm;