import React, {Component} from 'react';
import {FiHeart} from 'react-icons/fi';
import InfoUser from '../../../infoUser/infoUser';
import classes from "./oldComment.module.css";
import AuthService from '../../../../services/authService';


class OldComment extends Component {
    constructor(props) {
        super(props)
        this.state={
            avatar: "",
        }
    }

    componentDidMount = () => {
        AuthService.getById(this.props.userId)
        .then(response => {
            if(response){
                this.setState({
                    avatar: response.data.avatar
                })
            }
        })
    }



    render(){
        let image = "";
        if (this.props.image){
            image = (
                        <img src={this.props.image} width={"50px"} height={"50px"} alt="" />
                    )
        }
        return (
            <div className={classes.commentaire__old}>
                <InfoUser avatar={this.state.avatar} mode={"comment"}/> 
                <div className={classes.comment}>
                    {image}
                    <p  className={classes.commentaire__text} >{this.props.description}</p>
                </div>                          
                <div>
                    <FiHeart  onClick={this.like} className={classes.heart}/>
                    <span>10</span>
                </div>
            </div>
        );
    }
}

export default OldComment;