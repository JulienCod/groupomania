import React, {Component} from 'react';
import AuthService from '../../../services/authService';
import classes from "./pageProfils.module.css";
import { userModifyMinValidation, userModifyValidation } from '../../../services/formValidation';

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
            errorMessage:"",
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fileInput = React.createRef();
    }

    componentDidMount = () => {
        let userId = AuthService.getCurrentUser().userId;
        this.setState({
            userId: userId,
            errorMessage:"",
        })
        AuthService.getById(userId)
        .then((response) => {
            this.setState({
                email: response.data.email,
                lastname: response.data.lastname,
                firstname: response.data.firstname,
                avatar :response.data.avatar,
            })
            let user = JSON.parse(sessionStorage.getItem("user"))
            
            user = {
                ...user,
                lastname: response.data.lastname,
                firstname: response.data.firstname,
                avatar :response.data.avatar,
            }
            sessionStorage.setItem("user", JSON.stringify(user));

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
    handleValidationModify = async (event) => {
        event.preventDefault();    
        let userId = this.state.userId
        let image =  this.fileInput.current.files[0];
        let user ={}
        let errorform = null;
        if(this.state.password || this.state.newPassword){
            user = {
                email: this.state.email,
                    lastname: this.state.lastname,
                    firstname: this.state.firstname,
                    password: this.state.password,
                    newPassword: this.state.newPassword,
            }
            
            errorform = userModifyValidation(user);
        }else{
            user = {
                email: this.state.email,
                    lastname: this.state.lastname,
                    firstname: this.state.firstname,
            }
            errorform = userModifyMinValidation(user);
        }
        if (errorform.error) {
            this.setState({
                messageError: errorform.error.details[0].message
            })
        }else{
            const error = await AuthService.modifyProfils(userId, user, image);
            if(!error){
                await AuthService.getById(userId)
                .then((response) => {
                    this.setState({
                        avatar :response.data.avatar,
                    })
                    let user = JSON.parse(sessionStorage.getItem("user"))
                    
                    user = {
                        ...user,
                        avatar :response.data.avatar,
                    }
                    sessionStorage.setItem("user", JSON.stringify(user));
        
                })        
                window.location.reload();
            }
        }
    }
    deleteProfiles = async () =>{
        if(window.confirm('Voulez-vous vraiment supprimer votre profil')){
            let userId = this.state.userId;
            await AuthService.deleteUser(userId);
            sessionStorage.removeItem("user");
            document.location.href = "/";
        }
    }

    render(){
        let image = "";

        
        if(this.state.imagePreview){
            image = (
                <div className={classes.container__img}>
                    <img src={this.state.imagePreview}  alt="" className={classes.image} />
                </div>    
            )
        }else{
            image = ( 
                <div className={classes.container__img}>
                    <img src={this.state.avatar} alt="" className={classes.image}/>
                </div>                       
            )
        }
        let error="";
        if(this.state.messageError){
            error=(
                <span className={classes.error}>{this.state.messageError}</span>
            )
        }
        return (
            <article className={classes.profils}>
                <form method="post" className={classes.form}>

                    <div className={classes.title}>
                        <h1>Profils utilisateur</h1>    
                    </div>

                    <div className={classes.password}>
                        <h2>Modifier le mot de passe</h2>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Mot de passe actuel" 
                            id='password'
                            value={this.state.password} 
                            onChange={(event)=> this.setState({password:event.target.value}) }
                            className={classes.field}
                        />
                        <input 
                            type="password" 
                            name="newPassword" 
                            placeholder="Nouveau mot de passe" 
                            id='newPassword'
                            value={this.state.newPassword} 
                            onChange={(event)=> this.setState({newPassword:event.target.value}) }
                            className={classes.field}
                        />        
                    </div>

                    <div className={classes.firstname_lastname}>
                        <h2>E-mail</h2>
                        <p>{this.state.email}</p>

                        <h3>Nom et pr??nom</h3>
                        <input 
                            title='Pr??nom'
                            type="text" 
                            name="lastname" 
                            placeholder="Pr??nom" 
                            id='lastname'
                            value={this.state.lastname} 
                            onChange={(event)=> this.setState({lastname:event.target.value}) }
                            className={classes.field}
                        />                        
                        <input 
                            title='Nom'
                            type="text" 
                            name="firstname" 
                            placeholder="Nom" 
                            id='firstname'
                            value={this.state.firstname} 
                            onChange={(event)=> this.setState({firstname:event.target.value}) }
                            className={classes.field}
                        />                        
                    </div>

                    <div className={classes.avatar}>
                        <h2>Photo de profil</h2>
                        {image}
                        <input 
                            type="file" 
                            accept="image/*"
                            name="avatar" 
                            placeholder="avatar" 
                            id='avatar'
                            ref={this.fileInput} 
                            onChange={this.handleImageChange}
                            className={classes.inputfile}
                        />
                        <label htmlFor='avatar'>S??lectionner une image</label>
                    </div>

                    <div className={classes.validation_delete}>
                        {error}
                        <span title="Modifi??" onClick={this.handleValidationModify} className={classes.btn}>Modifier mon compte</span>
                        <span title="Supprim??" onClick={this.deleteProfiles} className={classes.btn}>Supprimer mon compte</span>
                    </div>
                </form>
            </article>
        );
    }
}


export default PageProfils;