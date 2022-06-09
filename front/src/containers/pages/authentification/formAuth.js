import React, {Component} from 'react';
import classes from './formAuth.module.css';
import AuthService from  '../../../services/authService';
import Button from '../../../components/button/btn';
// import profils from './images/profils/profils';

class FormAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password:"",
            lastname: "",
            firstname: "",
            avatar :"",
            imagePreview:"",
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
   
    handleValidationFormSignup = (event) => {
        event.preventDefault();    
        let image =  this.fileInput.current.files[0];
        let signup = {
                email: this.state.email,
                password: this.state.password,
                lastname: this.state.lastname,
                firstname: this.state.firstname,
        }
        AuthService.signup(signup, image);
    }
    handleValidationFormLogin = (event) => {
        event.preventDefault();
        let login = {
            email: this.state.email,
            password: this.state.password,
        }
        AuthService.login(login);       
    }
    
    render(){
        let title ="";
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
                    <img src="images/profils/profils.png"  width="100px" alt="" className={classes.image}/>
                </div>                       
            )
        }
        const mode = this.props.mode;
        let form = "";
        if (mode === 'signup'){
            title = "Créer un compte"
            form = (
                <>
                    <div className={classes.field}>
                        <label htmlFor='lastname'>Lastname : </label>
                        <input 
                            type="text" 
                            name="lastname" 
                            placeholder="lastname" 
                            id='lastname'
                            value={this.state.lastname} 
                            onChange={(event)=> this.setState({lastname:event.target.value}) }
                        />                        
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='firstname'>Firstname : </label>
                        <input 
                            type="text" 
                            name="firstname" 
                            placeholder="firstname" 
                            id='firstname'
                            value={this.state.firstname} 
                            onChange={(event)=> this.setState({firstname:event.target.value}) }
                        />                        
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='avatar'>Avatar : </label>
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
                        <Button clic={this.handleValidationFormSignup}>Créez un compte</Button>
                    </div>      
                </>
            )
        }else if (mode ==='login'){
            title = "Identifiez-vous"
            form=(
                <div>
                    <Button clic={this.handleValidationFormLogin}>Se connecter</Button>
                </div>
            )
        }

        return (
            <article className={classes.article}>
                <form className={classes.form}>
                    <h1>{title}</h1>
                    <div className={classes.field}>
                        <label htmlFor='email'>Email : </label>
                        <input 
                            type="email"
                            name="email" 
                            placeholder="Email" 
                            id='email'
                            value={this.state.email}
                            onChange={(event)=> this.setState({email:event.target.value}) }
                        />
                    </div>
                    <div className={classes.field}>
                        <label htmlFor='password'>Password : </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            id='password'
                            value={this.state.password} 
                            onChange={(event)=> this.setState({password:event.target.value}) }
                        />                        
                    </div>
                        {form}
                </form>
            </article>
        );
    }
}

export default FormAuth;