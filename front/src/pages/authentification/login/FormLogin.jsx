import React from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../../services/authService';
import { joiResolver } from '@hookform/resolvers/joi';
import classes from './FormLogin.module.css';
import Button from '../../../components/button/btn';
import { loginSchema } from '../../../services/formValidation';

export default function FormLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(loginSchema)
  });
  const onSubmit = async data => await AuthService.login(data);

  return (
    <article className={classes.article}>
      <h1>Bienvenue sur Groupomania</h1>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Identifiez-vous</h2>
        <div className={classes.field}>
          <input type="email"
            title='adresse email'
            placeholder="Adresse email"
            {...register("email")} />
          <span className={classes.error}>{errors.email?.message}</span>
        </div>

        <div className={classes.field}>
          <input type="password"
            title='Mot de passe'
            placeholder="Mot de passe"
            {...register("password")} />
          <span className={classes.error}>{errors.password?.message}</span>
        </div>
        <div>
          <Button title="Se connecter">Se connecter</Button>
        </div>
      </form>
    </article>
  );
}