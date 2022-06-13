import React, {Component} from 'react';
import classes from './homePost.module.css';
import {RiCloseCircleLine} from 'react-icons/ri';
import PostManager from '../../formaulairePost/post/postManager';
import AuthService from '../../../services/authService';

class HomePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            welcome: false,
        }
    }
    componentDidMount = () => {
        let user = AuthService.getCurrentUser();
        if (user.welcome){
            this.setState({
                welcome:true,
                firstname:user.firstname,
                lastname:user.lastname,
            })
        }
    }

    closeWelcome = () =>{
        let user = AuthService.getCurrentUser();
        user.welcome = false;
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
            welcome:false
        })
    }    
    
    render(){  
        let welcome = this.state.welcome;
        let welcomeContent = "";
        if (welcome) {
            welcomeContent = (
                <div>
                    <span>Bienvenue {this.state.firstname} {this.state.lastname}</span>
                    <RiCloseCircleLine onClick={this.closeWelcome} className={classes.closeWelcome}/>
                </div>
            )
        }

        return (
            <>
                {welcomeContent}

                <PostManager />
            </>
        );
    }
}

export default HomePost;