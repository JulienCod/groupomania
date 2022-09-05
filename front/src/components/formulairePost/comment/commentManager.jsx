import React, { useState, useEffect } from 'react';
import classes from "./commentManager.module.css";
import OldComment from './oldComment/oldComment';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import PostService from '../../../services/postService';
import AuthService from '../../../services/authService';
import FormComment from '../newForm/formComment/FormComment';

export default function CommentManager(props) {
    const [listComments, setListComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [displayComment, setDisplayComment] = useState(false);
    const [liked, setLiked] = useState(false);
    const [reload, setReload] = useState(false);
    const [countLike, setCountLike] = useState(0);
    const [listPost, setListPost] = useState([]);

    useEffect(() => {
        setReload(false);
        let idPost = props.idPost
        PostService.getById(idPost)
            .then(async response => {
                if (response) {
                    let listPost = await response.data.likePosts
                    let findUserLike = await listPost.find(user => user.userId === currentUser)
                    let liked = false;
                    if (findUserLike) {
                        liked = findUserLike.liked;
                    }

                    let countLike = listPost.filter(like => like.liked)
                    setListComments(response.data.commentaires)
                    setListPost(listPost)
                    setCountLike(countLike.length)
                    setLiked(liked)
                }
            })
    }, [reload]);

    const like = async () => {
        let postId = props.idPost;
        let liked = false;
        let findUserLike = listPost.find(user => user.userId === currentUser)
        let likeId = "";
        if (findUserLike) {
            likeId = findUserLike.id
            liked = findUserLike.liked
        }
        let data = {
            likeId: likeId,
            userId: currentUser,
            liked: liked
        }
        if (liked) {
            liked = false;
            data = {
                ...data,
                likeId: likeId,
                liked: liked
            }
            await PostService.likePost(postId, data);
            setReload(true);
        } else {
            liked = true;
            data = {
                ...data,
                liked: liked
            }
            await PostService.likePost(postId, data)
            setReload(true);
        }
    }

    const handleCallback = async () => {
        setReload(true);
    }
    return (
        <section className={classes.commentaire__container}>
            <div className={classes.container__likeAndCom}>
                <div onClick={() => setDisplayComment(!displayComment)} className={classes.container__com}>
                    <p >Commentaire</p>
                </div>
                <div className={classes.container__like}>
                    {
                        liked ?
                            <FaHeart onClick={like} className={classes.heartLiked} />
                            :
                            <FiHeart onClick={like} className={classes.heart} />
                    }
                    <span>{countLike}</span>
                </div>
            </div>
            {displayComment &&
                <>
                    <h3 className={classes.commentaire__title}>Commentaires</h3>
                    {listComments.length > 0 &&
                        listComments.map(comment => {
                            return (
                                <OldComment {...comment} key={comment.id} parentCallback={handleCallback} />
                            )
                        }
                        )}
                    <FormComment idPost={props.idPost} parentCallback={handleCallback} />
                </>
            }
        </section>
    )
}