import React, {Component} from 'react';
import AuthService from '../../../services/authService';
import classes from "./pageProfils.module.css";
import {FiPenTool} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri';

class PageProfils extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:"",
            lastname:"",
            firstname:"",
            password:"",
            imagePreview:"",
            avatar:"",
            newPassword:"",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fileInput = React.createRef();
    }

    componentDidMount = () => {
        let userId = AuthService.getCurrentUser().userId;
        this.setState({
            userId: userId,
        })
        AuthService.getById(userId)
        .then((response) => {
            this.setState({
                email: response.data.email,
                lastname: response.data.lastname,
                firstname: response.data.firstname,
                avatar :response.data.avatar,
            })
        })        
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
    handleValidationModify = (event) => {
        event.preventDefault();    
        let userId = this.state.userId
        let image =  this.fileInput.current.files[0];
        let user = {
                email: this.state.email,
                password: this.state.password,
                lastname: this.state.lastname,
                firstname: this.state.firstname,
                password: this.state.password,
                newPassword: this.state.newPassword,
        }
        AuthService.modifyProfils(userId, user, image)
    }
    deleteProfiles = async () =>{
        let userId = this.state.userId;
        await AuthService.deleteUser(userId);
        localStorage.removeItem("user");
        document.location.href = "/";
    }

    render(){
        let image = "";

        
        if(this.state.imagePreview){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.imagePreview} width="100px" alt="" className={classes.image} />
                </div>    
            )
        }else{
            image = ( 
                <div className={classes.container__img}>
                    <img src={this.state.avatar}  width="100px" alt="" className={classes.image}/>
                </div>                       
            )
        }

        return (
            <article>
                 <form className={classes.form} >
                    <h1>Profils utilisateur</h1>
                    <div className={classes.field}>
                        <label htmlFor='email'></label>
                        <input 
                            type="email"
                            name="email" 
                            placeholder="Adresse Email" 
                            id='email'
                            value={this.state.email}
                            onChange={(event)=> this.setState({email:event.target.value}) }
                        />
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='password'></label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Ancien mot de passe" 
                            id='password'
                            value={this.state.password} 
                            onChange={(event)=> this.setState({password:event.target.value}) }
                        />                        
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='newPassword'></label>
                        <input 
                            type="password" 
                            name="newPassword" 
                            placeholder="Nouveau mot de passe" 
                            id='newPassword'
                            value={this.state.newPassword} 
                            onChange={(event)=> this.setState({newPassword:event.target.value}) }
                        />        
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='lastname'></label>
                        <input 
                            type="text" 
                            name="lastname" 
                            placeholder="Prénom" 
                            id='lastname'
                            value={this.state.lastname} 
                            onChange={(event)=> this.setState({lastname:event.target.value}) }
                        />                        
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='firstname'></label>
                        <input 
                            type="text" 
                            name="firstname" 
                            placeholder="Nom" 
                            id='firstname'
                            value={this.state.firstname} 
                            onChange={(event)=> this.setState({firstname:event.target.value}) }
                        />                        
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='avatar'></label>
                        <input 
                            type="file" 
                            accept="image/*"
                            name="avatar" 
                            placeholder="avatar" 
                            id='avatar'
                            ref={this.fileInput} 
                            onChange={this.handleImageChange}
                        />
                        {image}
                    </div>
                    <div>
                        <FiPenTool title="Modifié" onClick={this.handleValidationModify} className={classes.iconModify} />
                        <RiDeleteBin6Line title="Supprimé" onClick={this.deleteProfiles} className={classes.iconDelete} />
                    </div>
                </form>
            </article>
        );
    }
}


export default PageProfils;