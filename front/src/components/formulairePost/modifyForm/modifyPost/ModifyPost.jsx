import React, { useState, useEffect } from 'react'
import classes from './modifyPost.module.css';
import { FiSend } from 'react-icons/fi';
import PostService from '../../../../services/postService';
import resizeFile from '../../../../services/resizeFile';
import { formModifyValidation } from '../../../../services/formValidation';
import { RiCloseCircleLine } from 'react-icons/ri';

export default function ModifyPost(props) {

    const [messageError, setMessageError] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        const postId = props.post.postId
        PostService.getById(postId)
            .then(response => {
                setDescription(response.data.description);
                setImage(response.data.image);
                setMessageError("");
            })
    }, []);

    const handleChange = event => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview)
    }

    const submitModifyPost = async (event) => {
        event.preventDefault();
        const postId = props.post.postId;
        let image = await resizeFile.social(file);
        let post = {
            description: description,
        }

        const errorform = formModifyValidation(post);

        if (!description && !image) {
            setMessageError("Le post doit contenir au minimum une image ou du texte");
        } else if (errorform.error) {
            setMessageError(errorform.error.details[0].message)
        } else {
            await PostService.modifyPost(postId, post, image);
            await props.parentCallback();
        }
    }

    return (
        <div className={classes.form__container}>
            <form className={classes.form} method="post">
                <textarea
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder='Écrivez un commentaire ...'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className={classes.modifyPost__textarea}
                ></textarea>
                {messageError && <span className={classes.error}>{messageError}</span>}
                <div className={classes.input_img_send}>
                    <input
                        type="file"
                        accept="image/*"
                        name="pictureModifyPost"
                        id='pictureModifyPost'
                        className={classes.inputfile}
                        onChange={(e) => { handleChange(e) }}
                    />
                    <label htmlFor="pictureModifyPost">Sélectionner une image</label>
                    {preview ?
                        <div className={classes.container__img}>
                            <RiCloseCircleLine title="Supprimer l'image" onClick={() => {
                                setPreview("");
                                setFile(null);
                            }} className={classes.closePreview} />
                            <img src={preview} width="100px" alt={preview} className={classes.image} />
                        </div>
                        :
                        <div className={classes.container__img}>
                            <img src={image} width="100px" alt={image} className={classes.image} />
                        </div>
                    }
                    <div className={classes.send}>
                        <FiSend title="Envoyer" onClick={submitModifyPost} className={classes.modify__send} />
                    </div>
                </div>
            </form>
        </div>
    )
}