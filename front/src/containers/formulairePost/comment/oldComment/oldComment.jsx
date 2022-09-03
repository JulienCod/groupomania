import React, { useState, useEffect } from 'react';
import { FiHeart, FiPenTool } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import InfoUser from '../../../infoUser/infoUser';
import classes from "./oldComment.module.css";
import AuthService from '../../../../services/authService';
import CommentService from '../../../../services/commentService';
import Swal from 'sweetalert2';
import ModifyComment from '../../modifyForm/modifyComent/ModifyComment';

// class OldComment extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             avatar: "",
//             modify: false,
//             delete: false,
//             countLike: 0,
//             liked: false,
//         }
//     }

//     componentDidMount = async () => {
//         let currentUser = AuthService.getCurrentUser().userId
//         const user = AuthService.getCurrentUser();
//         await CommentService.getById(this.props.id)
//             .then(comment => {
//                 this.setState({
//                     commentId: comment.data.id,
//                     postId: comment.data.postId,
//                     likeComments: comment.data.likeComments
//                 })
//             })
//         await AuthService.getById(this.props.userId)
//             .then(response => {
//                 if (response) {
//                     this.setState({
//                         avatar: response.data.avatar,
//                         currentUser: user.userId,
//                         admin: user.admin
//                     })
//                 }
//             })
//         let findUserLike = this.state.likeComments.find(user => user.userId === currentUser)
//         let liked = false;
//         if (findUserLike) {
//             liked = findUserLike.liked;
//         }
//         let listLiked = this.state.likeComments.filter(like => like.liked)
//         this.setState({
//             loading: true,
//             currentUser: currentUser,
//             countLike: listLiked.length,
//             liked: liked,
//         })
//     }

//     modifyComment = () => {
//         let value = Boolean
//         if (this.state.modify) {
//             value = false;
//         } else if (!this.state.modify) {
//             value = true;
//         }
//         this.setState({
//             modify: value,
//         })
//     }

//     deleteComment = async () => {
//         Swal.fire({
//             title: 'Êtes-vous sur de vouloir supprimer ce commentaire?',
//             text: "Cette action sera irréversible!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Oui, supprimer ce commentaire!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 let commentId = this.props.id;
//                 this.setState({
//                     delete: true,
//                 })
//                 await CommentService.deleteComment(commentId);
//                 Swal.fire(
//                     'Supprimer!',
//                     'Le commentaire a bien été supprimé.',
//                     'success'
//                 )
//             }
//         })
//     }

//     like = async () => {
//         let commentId = this.state.commentId;
//         let liked = false;
//         let findUserLike = this.state.likeComments.find(user => user.userId === this.state.currentUser)
//         let likeId = "";
//         if (findUserLike) {
//             likeId = findUserLike.id
//         }
//         let data = {
//             likeId: likeId,
//             userId: this.state.currentUser,
//             liked: liked,
//             postId: this.state.postId
//         }
//         if (this.state.liked) {
//             likeId = findUserLike.id;
//             liked = false;
//             data = {
//                 ...data,
//                 likeId: likeId
//             }
//             await CommentService.likeComment(commentId, data);
//             await this.componentDidMount();
//         } else {
//             liked = true;
//             data = {
//                 ...data,
//                 liked: liked
//             }
//             await CommentService.likeComment(commentId, data)
//             await this.componentDidMount();
//         }
//     }
//     handleCallback = async () => {
//         this.setState({
//             loading: true,
//             modify: false,
//         })
//         await this.props.parentCallback();
//     }

//     render() {
//         let description = "";
//         if (this.props.description) {
//             description = (
//                 <div className={classes.comment}>
//                     <p className={classes.commentaire__text} >{this.props.description}</p>
//                 </div>
//             )
//         }
//         let options = "";
//         if (this.props.userId === this.state.currentUser || this.state.admin) {
//             options = (
//                 <div className={classes.comment__option}>
//                     <FiPenTool title="Modifié" onClick={this.modifyComment} className={classes.iconModify} />
//                     <RiDeleteBin6Line title="Supprimé" onClick={this.deleteComment} className={classes.iconDelete} />
//                 </div>
//             )
//         }
//         let image = "";
//         if (this.props.image) {
//             image = (
//                 <div className={classes.container__img}>
//                     <img src={this.props.image} className={classes.img} alt="" />
//                 </div>
//             )
//         }
//         let modify = "";
//         if (this.state.modify) {
//             modify = (
//                 <ModifyComment {...this.props} parentCallback={this.handleCallback} />
//             )
//         } else {
//             modify = (
//                 <div className={classes.container__comment}>

//                     {image}

//                     {description}

//                     {options}
//                 </div>
//             )
//         }
//         let heart = "";
//         if (this.state.liked) {
//             heart = (
//                 <div className={classes.heart_and_count}>
//                     <FaHeart onClick={this.like} className={classes.heartLiked} />
//                 </div>
//             )
//         } else {
//             heart = (
//                 <div className={classes.heart_and_count}>
//                     <FiHeart onClick={this.like} className={classes.heart} />
//                 </div>
//             )
//         }
//         let like = "";
//         if (this.state.modify) {
//             like = (<></>)
//         } else {
//             like = (
//                 <>
//                     {heart}
//                     <span className={classes.countLike}>{this.state.countLike}</span>
//                 </>
//             )

//         }

//         let content = "";
//         if (!this.state.delete) {
//             content = (
//                 <div className={classes.commentaire__old}>
//                     <InfoUser avatar={this.state.avatar} mode={"comment"} cssInfoUser={classes.infoUser} />
//                     {modify}

//                     {like}
//                 </div>
//             )
//         }
//         return (
//             <>
//                 {content}
//             </>
//         );
//     }
// }

// export default OldComment;

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
        setModify(false);
        setDelComment(false);
        setReload(false);
        CommentService.getById(props.id)
            .then(comment => {
                let commentId = comment.data.id;
                let postId = comment.data.postId;
                let likeComments = comment.data.likeComments;
                let user = comment.data.user;
                let image = comment.data.image;
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
            })

    }, [reload]);

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
                await CommentService.deleteComment(commentId);
                Swal.fire(
                    'Supprimer!',
                    'Le commentaire a bien été supprimé.',
                    'success'
                )
            }
        })
    }

    const like = async () => {
        let liked = false;
        let findUserLike = likeComments.find(user => user.userId === currentUser)
        let likeId = "";
        if (findUserLike) {
            likeId = findUserLike.id
            liked = findUserLike.liked
        }
        let data = {
            likeId: likeId,
            userId: currentUser,
            liked: liked,
            postId: postId
        }
        if (liked) {
            likeId = findUserLike.id;
            liked = false;
            data = {
                ...data,
                likeId: likeId,
                liked: liked
            }
            await CommentService.likeComment(commentId, data);
            setReload(true);
        } else {
            liked = true;
            data = {
                ...data,
                liked: liked
            }
            await CommentService.likeComment(commentId, data)
            setReload(true);
        }
    }
    
    const handleCallback = async () => {
        setReload(true);
        await props.parentCallback();
    }

    return (
        <>
            {!delComment &&

                <div className={classes.commentaire__old}>
                    <InfoUser avatar={user.avatar} mode={"comment"} cssInfoUser={classes.infoUser} />
                    <>
                        {modify ?
                            <ModifyComment {...props} parentCallback={handleCallback} />
                            :
                            <div className={classes.container__comment}>

                                {image &&
                                    <div className={classes.container__img}>
                                        <img src={image} className={classes.img} alt="" />
                                    </div>
                                }

                                {description &&
                                    <div className={classes.comment}>
                                        <p className={classes.commentaire__text} >{props.description}</p>
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
