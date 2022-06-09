import React, {Component} from 'react';
import classes from "./newPost.module.css";
import {FiSend} from 'react-icons/fi';


class NewPost extends Component {
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

    handleInputChange = (event) => {
        const name = event.target.name;
        this.setState({
            [name] : event.target.value,
        })
    }

    handleImageChange = (event) => {
        event.preventDefault();
        this.setState({ imagePreview: URL.createObjectURL(this.fileInput.current.files[0]) })
    }

    submitPost = (event) => {
        event.preventDefault();
        let description = this.state.description;
        let image =  this.fileInput.current.files[0];
        if(image && description){
            console.log(image);
            console.log(description);
        }else if (description) {
            console.log(description);            
        }else if(image){
            console.log(image);
        }else{
            this.setState({ 
                messageError: "veuillez saisir un texte ou ajouter une image"
            })
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

        return (
            <article className={classes.newPost__container}>
                <section className={classes.newPost}>
                    <form className={classes.newPost__form} method="post">
                        <h2>Exprimez-vous ...</h2>
                        <textarea
                        type="textarea"
                        name="description"
                        id="description"
                        value={this.state.description}
                        onChange={this.handleInputChange}
                          className={classes.newPost__textArea} 
                          ></textarea>
                            
                        <input 
                        type="file" 
                        accept="image/*"
                        name="picture" 
                        id='picture' 
                        ref={this.fileInput} 
                        onChange={this.handleImageChange}
                        />
                        {image}
                        <FiSend onClick={this.submitPost} className={classes.newPost__send}/>
                    </form>
                    {error}
                </section>
            </article>
        );
    }
}

export default NewPost;