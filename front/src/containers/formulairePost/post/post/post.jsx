import React, { useState, useEffect, Component } from 'react';
import { FiPenTool } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ContainerPost from '../ContainerPost/ContainerPost';
import CommentManager from '../../comment/commentManager';
import classes from "./post.module.css";
import InfoUSer from "../../../infoUser/infoUser";
import PostService from '../../../../services/postService';
import ModifyForm from '../../modifyForm/modifyForm';
import Swal from 'sweetalert2';

export default function Post(props) {

    const [postId, setPostId] = useState(props.post.postId);
    const [updatePost, setUpdatePost] = useState(false);

    const modifyPost = () => {
        setUpdatePost(!updatePost);
    }

    const deletePost = async () => {
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer ce post?',
            text: "Cette action sera irréversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer ce post!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await PostService.deletePost(postId);
                await Swal.fire(
                    'Supprimer!',
                    'Le post a bien été supprimé.',
                    'success'
                )
                handleCallback();
            }
        })
    }

    const handleCallback = async () => {
        setUpdatePost(false);
        await props.parentCallback();
    }

    return (
        <article className={classes.post__container}>
            <section className={classes.post} >
                <div className={classes.post__info}>
                    <InfoUSer 
                    mode="post" 
                    avatar={props.user.avatar} 
                    firstname={props.user.firstname} 
                    lastname={props.user.lastname} 
                    dataTime={props.post.datePublication} 
                    hour={props.post.hourPublication} />
                    {props.post.userId === props.currentUserId || props.admin ?
                        <div className={classes.post__option}>
                            <FiPenTool title="Modifier" onClick={modifyPost} className={classes.iconModify} />
                            <RiDeleteBin6Line title="Supprimer" onClick={deletePost} className={classes.iconDelete} />
                        </div>
                        : null
                    }
                </div>
                {
                    updatePost ?
                        <ModifyForm mode="post" {...props} parentCallback={handleCallback} />
                        :
                        <ContainerPost image={props.post.image} description={props.post.description} />
                }
            </section>
            <CommentManager idPost={props.post.postId} listLike={props.likePost} />
        </article>
    );
}