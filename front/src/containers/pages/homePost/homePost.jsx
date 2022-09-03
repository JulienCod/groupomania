import React, { useState, useEffect } from 'react';
import classes from './homePost.module.css';
import { RiCloseCircleLine } from 'react-icons/ri';
import PostManager from '../../formulairePost/post/postManager';
import AuthService from '../../../services/authService';
import ScrollButton from '../../../components/scroll-to-top/scrollToTop';

const HomePost = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())
    const [welcome, setWelcome] = useState(false);

    useEffect(() => {
        if (currentUser.welcome) {
            setWelcome(true)
        }
    }, [])

    return (
        <>
            <h1>Groupomania</h1>

            {welcome &&
                <div className={classes.welcome}>
                    <span>Bienvenue {currentUser.lastname} {currentUser.firstname}</span>
                    <RiCloseCircleLine onClick={() => {
                        currentUser.welcome = false;
                        window.sessionStorage.setItem("user", JSON.stringify(currentUser));
                        setWelcome(false);
                    }} className={classes.closeWelcome} />
                </div>
            }
            <ScrollButton />
            <PostManager />
        </>
    );
}

export default HomePost;