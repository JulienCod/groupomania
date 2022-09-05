import React, { useState } from 'react'
import classes from './formPost.module.css';
import { FiSend } from 'react-icons/fi';
import resizeFile from '../../../../services/resizeFile';
import { formValidationPost } from '../../../../services/formValidation';
import postService from '../../../../services/postService';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function FormPost(props) {

    const [messageError, setMessageError] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [descriptionPost, setDescriptionPost] = useState("");

    const handleChange = async event => {
        const selectedFile = await event.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview)
    }

    const submitPost = async (event) => {
        event.preventDefault();
        let description = descriptionPost;
        let image = await resizeFile.social(file);
        let post = {
            description: description
        }
        const errorform = formValidationPost(post);

        if (!description && !image) {
            setMessageError("Le post doit contenir au minimum une image ou du texte")
        } else if (errorform.error) {
            setMessageError(errorform.error.details[0].message)
        } else {
            await postService.createPost(post, image);
            setFile(null);
            setPreview("");
            setDescriptionPost("");
            setMessageError("");
            await props.parentCallback();
        }
    }

    return (
        <article className={classes.newPost__container}>
            <section className={classes.newPost}>
                <h2>Exprimez-vous ...</h2>
                <form className={classes.newPost__form} method="post">
                    <textarea
                        type="textarea"
                        name="descriptionPost"
                        id="descriptionPost"
                        placeholder="Que voulez-vous dire ?"
                        value={descriptionPost}
                        onChange={(event) => setDescriptionPost(event.target.value)}
                        className={classes.newPost__textArea}
                    ></textarea>
                    {messageError && <span className={classes.error}>{messageError}</span>}
                    <input
                        type="file"
                        accept="image/*"
                        name="picturePost"
                        id='picturePost'
                        className={classes.inputfile}
                        onChange={(e) => { handleChange(e) }}
                    />
                    <label htmlFor="picturePost">Sélectionner une image</label>
                    <div className={classes.img__send}>
                        {preview &&
                            <div className={classes.container__img}>
                                <RiCloseCircleLine title="Supprimer l'image" onClick={() => {
                                    setPreview("");
                                    setFile(null);
                                }} className={classes.closePreview} />
                                <img src={preview} alt="" className={classes.image} />
                            </div>
                        }
                        <FiSend title="Envoyer" type="submit" onClick={submitPost} className={classes.newPost__send} />
                    </div>
                </form>
            </section>
        </article>
    )
}