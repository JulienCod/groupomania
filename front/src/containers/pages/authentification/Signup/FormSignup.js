import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../../../services/authService';
import classes from './formSignup.module.css';
import { joiResolver } from '@hookform/resolvers/joi';
import { signupSchema } from '../../../../services/formValidation';
import Button from '../../../../components/button/btn';
import Image from '../../../../components/image/image';
import resizeFile from '../../../../services/resizeFile';

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
  const onSubmit = async data => {
    let file = data.avatar[0];
    let image = await resizeFile.profile(file);
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
          <span className={classes.error}>{errors.firstname?.message}</span>
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
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor='avatar'>Sélectionner une image</label>
          </div>
          {
            file ?
              <Image src={preview} alt={file.name} cssImage={classes.image} />
              :
              <Image src="images/profils/profils.png" alt="image de profils par défault" cssImage={classes.image} />
          }
        </div>
        <div>
          <Button>Créez un compte</Button>
        </div>
      </form>
    </article>
  );
}