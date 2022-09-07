import React, { useState, useEffect } from 'react';
import { FiHeart, FiPenTool } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import InfoUser from '../../infoUser/infoUser';
import classes from "./oldComment.module.css";
import AuthService from '../../../services/authService';
import CommentService from '../../../services/commentService';
import Swal from 'sweetalert2';
import ModifyComment from '../../formulaire/modifyForm/modifyComent/ModifyComment';

export default function OldComment(props) {

    const [modify, setModify] = useState(false);
    const [liked, setLiked] = useState(false);
    const [image, setImage] = useState();
    const [admin, setAdmin] = useState(AuthService.getAdmin());
    const [description, setDescription] = useState(props.description);
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [countLike, setCountLike] = useState(0);
    const [likeComments, setLikeComments] = useState([]);
    const [postId, setPostId] = useState();
    const [commentId, setCommentId] = useState();
    const [user, setUser] = useState({});
    const [reload, setReload] = useState(false);
    const [delComment, setDelComment] = useState(false);



    useEffect(() => {
        fetch();
        setReload(false);
        setModify(false);
        setDelComment(false);

    }, [reload]);

    const fetch = async () => {
        await CommentService.getById(props.id)
            .then(async comment => {
                let commentId = await comment.data.id;
                let postId = comment.data.postId;
                let likeComments = comment.data.likeComments;
                let user = comment.data.user;
                let image = comment.data.image;
                let description = comment.data.description;
                let findUserLike = likeComments.find(user => user.userId === currentUser)
                let liked = false;
                if (findUserLike) {
                    liked = findUserLike.liked;
                }
                let listLiked = likeComments.filter(like => like.liked)
                setCommentId(commentId);
                setUser(user);
                setImage(image);
                setPostId(postId);
                setLikeComments(likeComments);
                setCountLike(listLiked.length);
                setLiked(liked);
                setDescription(description);
            })

    }

    const modifyComment = () => {
        setModify(!modify);
    }

    const deleteComment = async () => {
        Swal.fire({
            title: 'Êtes-vous sur de vouloir supprimer ce commentaire?',
            text: "Cette action sera irréversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer ce commentaire!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let commentId = props.id;
                setDelComment(true);
                setModify(!modify);
                await CommentService.deleteComment(commentId);
                Swal.fire(
                    'Supprimer!',
                    'Le commentaire a bien été supprimé.',
                    'success'
                )
                await handleCallback();
            }
        })
    }

    const like = async () => {
        let data = {
            postId: postId
        }
        await CommentService.likeComment(commentId, data)
        setReload(true);
    }

    const handleCallback = async () => {
        await props.parentCallback();
    }
    return (
        <>
            {!delComment &&

                <div className={classes.commentaire__old}>
                    <InfoUser avatar={user.avatar} mode={"comment"} firstname={user.firstname} cssInfoUser={classes.infoUser} />
                    <>
                        {modify ?
                            <ModifyComment {...props} modifyComment={modifyComment} parentCallback={() => { setReload(true) }} />
                            :
                            <div className={classes.container__comment}>
                                {description &&
                                    <div className={classes.comment}>
                                        <h5>{user.firstname} {user.lastname}</h5>
                                        <p className={classes.commentaire__text} >{description}</p>
                                    </div>
                                }
                                {image &&
                                    <div className={classes.container__img}>
                                        <img src={image} className={classes.img} alt="" />
                                    </div>
                                }

                                {props.userId === currentUser || admin ?
                                    <div className={classes.comment__option}>
                                        <FiPenTool title="Modifier" onClick={modifyComment} className={classes.iconModify} />
                                        <RiDeleteBin6Line title="Supprimer" onClick={deleteComment} className={classes.iconDelete} />
                                    </div>
                                    : null
                                }
                            </div>
                        }
                    </>
                    <>
                        {modify ?
                            <></>
                            :
                            <>
                                {liked ?
                                    <div className={classes.heart_and_count}>
                                        <FaHeart onClick={like} className={classes.heartLiked} />
                                    </div>
                                    :
                                    <div className={classes.heart_and_count}>
                                        <FiHeart onClick={like} className={classes.heart} />
                                    </div>
                                }
                                <span className={classes.countLike}>{countLike}</span>
                            </>
                        }
                    </>

                </div>
            }
        </>
    )
}
