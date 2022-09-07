import React, { useState } from 'react';
import classes from './formComment.module.css';
import { FiSend } from 'react-icons/fi';
import commentService from '../../../../services/commentService';
import resizeFile from '../../../../services/resizeFile';
import { formValidationComment } from '../../../../services/formValidation';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function FormComment(props) {

    const [messageError, setMessageError] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [descriptionComment, setDescriptionComment] = useState("");
    const avatarCurrentUser = JSON.parse(sessionStorage.getItem("user")).avatar

    const handleChange = async event => {
        const selectedFile = await event.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview)
        setMessageError("");
    }

    const submitCommentaire = async (event) => {
        event.preventDefault();
        let description = descriptionComment;
        let image = await resizeFile.social(file);
        let comment = {
            description: description,
            postId: props.idPost
        }
        const errorform = formValidationComment(comment);
        if (!description && !image) {
            setMessageError("Le commentaire doit contenir au minimum une image ou du texte");
        } else if (errorform.error) {
            setMessageError(errorform.error.details[0].message)
        } else {
            await commentService.createComment(comment, image);
            setFile(null);
            setPreview("");
            setDescriptionComment("");
            setMessageError("");
            await props.parentCallback();
        }
    }

    return (
        <section className={classes.newCommentaire}>
            <form className={classes.commentaire__form} method="post">
                <div className={classes.commentaire__content}>
                    <img src={avatarCurrentUser} width={"50px"} height={"50px"} alt="" />
                    <textarea
                        title='Champ de saisi de texte'
                        type="textarea"
                        name={`description${props.idPost}`}
                        id={`description${props.idPost}`}
                        placeholder='Écrivez un commentaire ...'
                        value={descriptionComment}
                        onChange={(event) => setDescriptionComment(event.target.value)}
                        className={classes.newCommentaire__textarea}
                    ></textarea>
                    {messageError && <span className={classes.error}>{messageError}</span>}
                    <input
                        type="file"
                        accept="image/*"
                        name={`picture${props.idPost}`}
                        id={`picture${props.idPost}`}
                        className={classes.inputfile}
                        onChange={(e) => { handleChange(e) }}
                    />
                    <label htmlFor={`picture${props.idPost}`}>Sélectionner une image</label>
                </div>
                <div className={classes.comment__img__send}>
                    {preview &&
                        <div className={classes.container__img}>
                            <RiCloseCircleLine title="Supprimer l'image" onClick={() => {
                                setPreview("");
                                setFile(null);
                            }} className={classes.closePreview} />
                            <img src={preview} alt="image de previsualisation" className={classes.image} />
                        </div>
                    }
                    <FiSend title="envoyer" type="submit" onClick={submitCommentaire} className={classes.newCom__send} />
                </div>
            </form>
        </section>
    )
}