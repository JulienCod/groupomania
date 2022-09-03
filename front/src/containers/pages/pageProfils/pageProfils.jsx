import React, { useState, useEffect, Component } from 'react';
import AuthService from '../../../services/authService';
import classes from "./pageProfils.module.css";
import { userModifyMinValidation, userModifyValidation } from '../../../services/formValidation';
import resizeFile from '../../../services/resizeFile';
import Swal from 'sweetalert2';

export default function PageProfils() {

    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userId, setUserId] = useState(AuthService.getCurrentUser());
    const [messageError, setMessageError] = useState("");

    useEffect(() => {
        setMessageError("");
        AuthService.getById(userId)
            .then((response) => {
                setEmail(response.data.email);
                setLastname(response.data.lastname);
                setFirstname(response.data.firstname);
                setAvatar(response.data.avatar);

                let user = JSON.parse(sessionStorage.getItem("user"))

                user = {
                    ...user,
                    lastname: response.data.lastname,
                    firstname: response.data.firstname,
                    avatar: response.data.avatar,
                }
                sessionStorage.setItem("user", JSON.stringify(user));
            })
    }, [])

    const handleChange = event => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview)
    }

    const handleValidationModify = async (event) => {
        event.preventDefault();
        let image = await resizeFile.profile(file);
        let errorform = null;
        let user = {
            email: email,
            lastname: lastname,
            firstname: firstname,
        }
        if (password || newPassword) {
            user = {
                ...user,
                password: password,
                newPassword: newPassword,
            }
            errorform = userModifyValidation(user);
        } else {
            errorform = userModifyMinValidation(user);
        }

        if (errorform.error) {
            setMessageError(errorform.error.details[0].message)
        } else {
            setMessageError("");
            const error = await AuthService.modifyProfils(userId, user, image);
            if (!error) {
                await AuthService.getById(userId)
                    .then((response) => {
                            setAvatar(response.data.avatar)
                        let user = JSON.parse(sessionStorage.getItem("user"))
                        user = {
                            ...user,
                            avatar: response.data.avatar,
                        }
                        sessionStorage.setItem("user", JSON.stringify(user));

                    })
                window.location.reload();
            }
        }
    }

    const deleteProfiles = async () => {
        Swal.fire({
            title: 'Êtes-vous sur de vouloir supprimer votre compte?',
            text: "Cette action sera irréversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer mon compte!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await AuthService.deleteUser(userId);
                await Swal.fire(
                    'Supprimer!',
                    'Votre compte a bien été supprimé.',
                    'success'
                )
                window.sessionStorage.removeItem("user");
                window.sessionStorage.removeItem("token");
                document.location.href = "/";
            }
        })
    }

    return (
        <article className={classes.profils}>
            <form method="post" className={classes.form}>

                <div className={classes.title}>
                    <h1>Profils utilisateur</h1>
                </div>

                <div className={classes.password}>
                    <h2>Modifier le mot de passe</h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe actuel"
                        id='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={classes.field}
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Nouveau mot de passe"
                        id='newPassword'
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        className={classes.field}
                    />
                </div>

                <div className={classes.firstname_lastname}>
                    <h2>E-mail</h2>
                    <p>{email}</p>

                    <h3>Nom et prénom</h3>
                    <input
                        title='Prénom'
                        type="text"
                        name="lastname"
                        placeholder="Prénom"
                        id='lastname'
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        className={classes.field}
                    />
                    <input
                        title='Nom'
                        type="text"
                        name="firstname"
                        placeholder="Nom"
                        id='firstname'
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        className={classes.field}
                    />
                </div>

                <div className={classes.avatar}>
                    <h2>Photo de profil</h2>

                    {file ?
                        <div className={classes.container__img}>
                            <img src={preview} alt="" className={classes.image} />
                        </div>
                        :
                        <div className={classes.container__img}>
                            <img src={avatar} alt="" className={classes.image} />
                        </div>
                    }

                    <input
                        type="file"
                        accept="image/*"
                        name="avatar"
                        placeholder="avatar"
                        id='avatar'
                        onChange={(e) => { handleChange(e) }}
                        className={classes.inputfile}
                    />
                    <label htmlFor='avatar'>Sélectionner une image</label>
                </div>

                <div className={classes.validation_delete}>
                    {
                        messageError && <span className={classes.error}>{messageError}</span>
                    }
                    <span title="Modifié" onClick={handleValidationModify} className={classes.btn}>Modifier mon compte</span>
                    <span title="Supprimé" onClick={deleteProfiles} className={classes.btn}>Supprimer mon compte</span>
                </div>
            </form>
        </article>
    )
}