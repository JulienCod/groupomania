import classes from './card.module.css';
import { useState, useEffect} from 'react';
import PostService from "../../services/postService";
import {FiPenTool} from 'react-icons/fi';
import {RiDeleteBin6Line} from 'react-icons/ri';
import AuthService from "../../services/authService";
import { useForm } from 'react-hook-form';
import Button from "../button/btn";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Image from "../image/image";
import InfoUser from '../infoUser/infoUser';
import {FiHeart} from 'react-icons/fi';
import {FaHeart} from 'react-icons/fa';

// validation schema
const createPostSchema = Joi.object({
    description: Joi.string()
        .pattern(new RegExp('^[^$=]{3,}$'))
        .min(3)
        .messages({
            "string.pattern.base":"Le texte doit contenir au moins 3 caractères et ne doivent pas contenir de signe = ou $"
        }),
    image: Joi.object()
})

const Card = ({ post, refresh }) =>{
    const currentUserId = AuthService.getCurrentUser().userId;
    const isAdmin = AuthService.getCurrentUser().admin;
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [isUpdated, setIsUpdated]= useState(false);
    const [dltPost, setDltPost]= useState(false);
    const [countLiked, setCountLiked]= useState(0);
    const [isLiked, setIsLiked]= useState(false);
    const handleChange = event => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview)
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(createPostSchema)
    });
    const onSubmit = data => {
        let idPost = post.post.postId
        let image =  data.image[0];
        let modifPost = {
            description: data.description
        }
        PostService.modifyPost(idPost, modifPost, image);
        setTimeout(refresh , 1)
    }
    
    const deletePost = async postId => {
        await PostService.deletePost(postId);
        setDltPost(!dltPost);
        setTimeout(refresh , 1)
    }
    const displayUpdate = () =>{
        setIsUpdated(!isUpdated);
    }
    useEffect(() => {
        let findUserLike = post.likePost.find(user => user.userId === currentUserId)
        if(findUserLike){
            if(findUserLike.liked){
                setIsLiked(true);
            }else{
                setIsLiked(false);
            }
        }
    }, []);
    useEffect(() => {
        let countLike = post.likePost.filter(like => like.liked);
        setCountLiked(countLike.length);
    },[isLiked]);
    const like = async () => {
        let postId = post.post.postId;
        let liked = false;
        console.log(liked);
        let findUserLike = post.likePost.find(user => user.userId === currentUserId)
        let likeId ="";
        console.log(findUserLike);
        if(findUserLike){
            likeId = findUserLike.id
        }
        let data ={
            likeId:likeId,
            userId:currentUserId,
            liked:liked
        }
        console.log(liked);
        if(isLiked){
            console.log("liké");
            liked= false;
            likeId = findUserLike.id;
            data={
                ...data,
                likeId: likeId
            }
            await PostService.likePost(postId, data);
            setTimeout(refresh , 1)
        }else{
            liked = true;
            console.log("dislike");
            data={
                ...data,
                liked: liked
            }
            await PostService.likePost(postId, data);
            setTimeout(refresh , 1)
        }
    }

    return(
        <>
            <section className={classes.post} >
                <div className={classes.post__info}>
                    <InfoUser mode={"post"} avatar={post.user.avatar} firstname={post.user.firstname} lastname={post.user.lastname} dataTime={post.post.datePublication} hour={post.post.hourPublication} />
                        {currentUserId === post.user.userId  && 
                            <div className={classes.post__option}>
                                <FiPenTool title="Modifié" onClick={displayUpdate}className={classes.iconModify} />
                                <RiDeleteBin6Line title="Supprimé" onClick={() => deletePost(post.post.postId)} className={classes.iconDelete} />
                            </div> 
                        }
                        {isAdmin && 
                            <div className={classes.post__option}>
                                <FiPenTool title="Modifié" onClick={displayUpdate}className={classes.iconModify} />
                                <RiDeleteBin6Line title="Supprimé" onClick={() => deletePost(post.post.postId)} className={classes.iconDelete} />
                            </div> 
                        }
                </div>
                {
                    isUpdated?
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={classes.field}>
                            {
                                file ?
                                <Image src={preview} alt={file.name} cssImage={classes.image}/>
                                :
                                <Image src={post.post.image} className={classes.img} alt=""/>
                            }
                            <div className={classes.container__inputfile}>
                                <input 
                                className={classes.inputfile}
                                type="file" 
                                name='image'
                                id='image'
                                placeholder="image" 
                                {...register("image")}
                                onChange={(e)=> handleChange(e)}
                                /> 
                                <label htmlFor='image'>Sélectionner une image</label>
                            </div>
                        </div>

                        <div className={classes.field}>
                            <textarea 
                            className={classes.textarea}
                            defaultValue={post.post.description}
                            placeholder="Que voulez-vous dire ?" 
                            {...register("description")} />
                            <span className={classes.error}>{errors.description?.message}</span>
                        </div>

                        <div>
                            <Button>Modifié le Post</Button>
                        </div>
                    </form>
                    :
                    <div className={classes.container__description}>
                        <div className={classes.container__img}>
                            {post.post.image && <img className={classes.img} src={post.post.image} alt="" />}
                        </div>
                        <p className={classes.description}>{post.post.description}</p>
                    </div>
                }
                <section className={classes.commentaire__container}>
                <div className={classes.container__likeAndCom }>
                    <div onClick={"display commentaire"} className={classes.container__com}>
                        <p >Commentaire</p>
                    </div>
                    <div className={classes.container__like}>
                        {
                        isLiked?
                        <FaHeart  onClick={like} className={classes.heartLiked}/>
                        :
                        <FiHeart  onClick={like} className={classes.heart}/>
                        }
                        <span>{countLiked}</span>
                    </div>
                </div>
                </section>
            </section>
        </>
    )
}

export default Card;