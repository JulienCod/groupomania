import React, {Component} from 'react';
import classes from './modifyForm.module.css';
import {FiSend} from 'react-icons/fi';
import PostService from '../../../services/postService';
import CommentService from '../../../services/commentService';




class ModifyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description:"",
            image: "",
            imagePreview:"",
            mode: "",
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
                })
            })            
        } else if(mode ==="comment"){
            this.setState({
                description: this.props.description,
                image: this.props.image,
                mode: mode
            })
        }
    }
    submitModifyPost = async () => {
        const postId = this.props.post.postId;
        let image =  this.fileInput.current.files[0];
        let post = {
            description : this.state.description,
        }
        await PostService.modifyPost(postId, post, image);
        window.location.reload();
    }
    submitModifyComment = async () => {
        const commentId = this.props.id;
        let image =  this.fileInput.current.files[0];
        let comment = {
            description : this.state.description,
        }
        await CommentService.modifyComment(commentId, comment, image);
        window.location.reload();
    }

    render(){
        let image = "";
        if(this.state.imagePreview){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.imagePreview} width="100px" alt="" className={classes.image} />
                </div>    
            )
        }else if(this.state.image){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.image} width="100px" alt="" className={classes.image} />
                </div>    
            )
        }
        let content ="";
        if(this.state.mode === "post"){
            content = (
                <div>
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
                            <FiSend onClick={this.submitModifyPost} className={classes.newPost__send}/>
                        </form>
                </div>
            )
        }else if (this.state.mode === "comment"){
            content = (
                <div>
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
                        <FiSend onClick={this.submitModifyComment} className={classes.newPost__send}/>
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