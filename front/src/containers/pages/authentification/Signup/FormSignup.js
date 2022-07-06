import { useState} from 'react';
import { useForm } from 'react-hook-form';
import AuthService from  '../../../../services/authService';
import classes from './formSignup.module.css';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Button from '../../../../components/button/btn';
import Image from '../../../../components/image/image';

// validation schema
const signupSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
        .messages({
          "string.empty": "L'adresse mail est obligatoire",
          "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
        }),
        
    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
        .messages({
          "string.empty": "Le mot de passe est obligatoire",
          "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
          "string.min":"Le mot de passe doit contenir au minimum 8 caractères",
        }),
    lastname: Joi.string()
        .required()
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
          "string.empty":"Le prénom est obligatoire",
          "string.pattern.base":"Le prénom doit contenir entre 3 et 30 caractères",
        }),

    firstname: Joi.string()
        .required()
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
          "string.empty":"Le nom est obligatoire",
          "string.pattern.base":"Le nom doit contenir entre 3 et 30 caractères",
        }),
    avatar: Joi.object()
})

export default function FormSignup() {
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = event => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    const filePreview = URL.createObjectURL(selectedFile);
    setPreview(filePreview)
  }
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: joiResolver(signupSchema)
});
const onSubmit = data => {
    let image =  data.avatar[0];
    let signup = {
                email: data.email,
                password: data.password,
                lastname: data.lastname,
                firstname: data.firstname,
                }
    AuthService.signup(signup, image)
}
  
  return (
    <article className={classes.article}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Créer un compte</h2>
        <div className={classes.field}>
          <input 
          type="email" 
          placeholder="Adresse email" 
          {...register("email")} />
          <span className={classes.error}>{errors.email?.message}</span>
        </div>
        <div className={classes.field}>

        <input
          type="password" 
          placeholder="Mot de passe"
          {...register("password")} />
          <span className={classes.error}>{errors.password?.message}</span>
        </div>

        <div className={classes.field}>

        <input
          type="text" 
          placeholder="Prénom" 
          {...register("firstname")} />
          <span className={classes.error}>{errors.firstname?.message }</span>
        </div>

        <div className={classes.field}>
          <input 
          type="text"
          placeholder="Nom" 
          {...register("lastname")}
          />
          <span className={classes.error}>{errors.lastname?.message}</span>
        </div>

        <div className={classes.field}>
          <div className={classes.container__inputfile}>
            <input 
            className={classes.inputfile}
            type="file" 
            name='avatar'
            id='avatar'
            placeholder="avatar" 
            {...register("avatar")}
            onChange={(e)=> handleChange(e)}
            /> 
            <label htmlFor='avatar'>Sélectionner une image</label>
          </div>
            {
              file?
              <Image src={preview} alt={file.name} cssImage={classes.image}/>
              :
              <Image src="images/profils/profils.png"  alt="image de profils par défault" cssImage={classes.image}/>
            }
        </div>
        <div>
          <Button>Créez un compte</Button>
        </div>
      </form>
    </article>
  );
}