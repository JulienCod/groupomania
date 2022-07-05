import { useState} from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from "react-dom";
import classes from './CreatePost.module.css';
import PropTypes from "prop-types";
import Button from "../../button/btn";
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Image from '../../image/image';
import authService from '../../../services/authService';
import PostService from '../../../services/postService';

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

const Modal = ({ isShowing, hide, title, refresh }) =>{
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

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
      let image =  data.image[0];
      let post = {
          userId: authService.getCurrentUser().userId,
          description: data.description
      }
      PostService.createPost(post, image);
      setTimeout(refresh , 1)
      setTimeout(hide, 1)
  }
  
  return(isShowing
    ? ReactDOM.createPortal(
        <>
          <div className={classes.modal_overlay}>
            <div className={classes.modal_wrapper}>
              <div className={classes.modal}>
                <div className={classes.modal_header}>
                  <h3>{title}</h3>
                  <Button
                    className={classes.modal_close_button}
                    clic={hide}
                  >
                    <span>&times;</span>
                  </Button>
                </div>
                <div className={classes.modal_body}>
                  <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={classes.field}>
                        {file && <Image src={preview} alt={file.name} cssImage={classes.image}/>}
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
                      placeholder="Que voulez-vous dire ?" 
                      {...register("description")} />
                      <span className={classes.error}>{errors.description?.message}</span>
                    </div>

                    <div>
                      <Button >Créez un post</Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null)}
  

Modal.propTypes = {
    isShowing: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default Modal;