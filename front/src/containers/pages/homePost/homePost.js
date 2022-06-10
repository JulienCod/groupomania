import React, {Component} from 'react';
import classes from './homePost.module.css';
import {RiCloseCircleLine} from 'react-icons/ri';
// import NewForm from '../../formaulairePost/newForm/newForm';
import PostManager from '../../formaulairePost/post/postManager';

class HomePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            welcome : true
        }
    }
    componentDidMount = () => {

    }

    closeWelcome = () =>{
        this.setState({
            welcome : false
        })
    }    
    
    render(){  
        let welcome = this.state.welcome;
        let welcomeContent = "";
        if (welcome) {
            welcomeContent = (
                <div>
                    <span>Bienvenue Julien</span>
                    <RiCloseCircleLine onClick={this.closeWelcome} className={classes.closeWelcome}/>
                </div>
            )
        }

        return (
            <>
                {welcomeContent}
                {/* <NewForm status="post" /> */}

                <PostManager />
            </>
        );
    }
}

export default HomePost;