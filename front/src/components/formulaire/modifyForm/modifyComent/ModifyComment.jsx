import React, { useState, useEffect } from 'react';
import classes from './modifyComment.module.css';
import CommentService from '../../../../services/commentService';
import { formModifyValidation } from '../../../../services/formValidation';
import resizeFile from '../../../../services/resizeFile';
import { FiSend, FiPenTool } from 'react-icons/fi';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function ModifyComment(props) {

    const [messageError, setMessageError] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setReload(false);
        setDescription(props.description);
        setImage(props.image);
        setMessageError("");
    }, [reload]);

    const handleChange = event => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview)
    }

    const submitModifyComment = async (event) => {
        event.preventDefault();
        const commentId = props.id;
        let image = await resizeFile.social(file);
        let comment = {
            description: description,
        }

        const errorform = formModifyValidation(comment);
        if (!description && !image) {
            setMessageError("Le commentaire doit contenir au minimum une image ou du texte")
        } else if (errorform.error) {
            setMessageError(errorform.error.details[0].message)
        } else {
            await CommentService.modifyComment(commentId, comment, image);
            await props.parentCallback();
        }
    }


    return (
        <div className={classes.form__container}>
            <form className={classes.form} method="post">
                <textarea
                    title='Champ de saisi de texte'
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder='Écrivez un commentaire ...'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className={classes.modifyCommentaire__textarea}
                ></textarea>
                {messageError && <span className={classes.error}>{messageError}</span>}
                <input
                    title='Sélectionner une image'
                    type="file"
                    accept="image/*"
                    name="pictureModifyComment"
                    id='pictureModifyComment'
                    className={classes.inputfile}
                    onChange={(e) => { handleChange(e) }}
                />
                <label htmlFor="pictureModifyComment">Sélectionner une image</label>
                <div className={classes.modify__img__send}>
                    {preview ?
                        <div className={classes.container__img}>
                            <RiCloseCircleLine title="Supprimer l'image" onClick={() => {
                                setPreview("");
                                setFile(null);
                            }} className={classes.closePreview} />
                            <img src={preview} alt={preview} className={classes.image} />
                        </div>
                        :
                        <>
                            {image &&
                                <div className={classes.container__img}>
                                    <img src={image} alt={image} className={classes.image} />
                                </div>
                            }
                        </>
                    }
                    <div className={classes.container__options}>
                        <FiPenTool title="Modifier" onClick={props.modifyComment} className={classes.iconModify} />
                        <FiSend title="Envoyer" onClick={submitModifyComment} className={classes.modify__send} />
                    </div>
                </div>

            </form>
        </div>
    )
}
