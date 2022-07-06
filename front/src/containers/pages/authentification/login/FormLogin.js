import React from 'react';
import { useForm } from 'react-hook-form';
import AuthService from  '../../../../services/authService';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import classes from './FormLogin.module.css';
import Button from '../../../../components/button/btn';

// validation schema
const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
        .messages({
          "string.empty": "L'adresse mail est obligatoire",
          "string.email": "l'extension doit contenir un @ et un domaine avec minimum deux caractères",
        }),
        
    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
        .messages({
          "string.empty": "Le mot de passe est obligatoire",
          "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
          "string.min":"Le mot de passe doit contenir au minimum 8 caractères",
        })
})

export default function FormLogin() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: joiResolver(loginSchema)
  });
  const onSubmit = data => AuthService.login(data);
  
  return (
    <article className={classes.article}>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Identifiez-vous</h2>
        <div className={classes.field}>
          <input type="email" 
          placeholder="Adresse email" 
          {...register("email")} />
          <span className={classes.error}>{errors.email?.message}</span>
        </div>

        <div className={classes.field}>  
          <input type="password" 
          placeholder="Mot de passe" 
          {...register("password")} />
          <span className={classes.error}>{errors.password?.message}</span>
        </div>
        <div>
          <Button>Créez un compte</Button>  
        </div>
      </form>
    </article>
  );
}