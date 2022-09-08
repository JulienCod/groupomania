import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { userSignupValidation, userLoginValidation, userModifyValidation, userModifyMinValidation } from '../middlewares/userValidation.js';
import jwt from 'jsonwebtoken';
import Post from '../models/post.js';
import Commentaire from '../models/commentaire.js';
import fs from 'fs'
import { AuthentificationError, UserError } from '../error/customError.js';

const signup = async (req, res, next) => {
    let user = JSON.parse(req.body.user);
    let image = req.file;
    if (image) {
        user = {
            ...user,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    }
    try {
        const { error } = userSignupValidation(user);
        if (error) throw new AuthentificationError(401, error.details[0].message);
        let hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        await User.create({ ...user });
        return res.status(201).json({ user: user, msg: "Create User" });
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    try {
        let body = {
            email: req.body.email,
            password: req.body.password,
        }
        const { error } = userLoginValidation(body)
        if (error) throw new AuthentificationError(401, error.details[0].message);
        let user = await User.findOne({ where: { email: body.email } })
        if (!user) throw new AuthentificationError(404, "L'utilisateur n'existe pas");
        let valid = await bcrypt.compare(body.password, user.dataValues.password);
        if (!valid) throw new AuthentificationError(401, "Le mot de passe saisi est incorrect")
        if (user.dataValues.isAdmin) {
            return res.status(200).json({
                token: jwt.sign(
                    {
                        userId: user.dataValues.id,
                        isAdmin: user.dataValues.isAdmin
                    },
                    `${process.env.TOKEN_KEY}`,
                    { expiresIn: '24h' }
                ),
                user: {
                    avatar: user.dataValues.avatar,
                    welcome: "true",
                    lastname: user.dataValues.lastname,
                    firstname: user.dataValues.firstname,
                    admin: user.dataValues.isAdmin
                }
            })
        } else {
            return res.status(200).json({
                token: jwt.sign(
                    {
                        userId: user.dataValues.id
                    },
                    `${process.env.TOKEN_KEY}`,
                    { expiresIn: '24h' }
                ),
                user: {
                    avatar: user.dataValues.avatar,
                    welcome: "true",
                    lastname: user.dataValues.lastname,
                    firstname: user.dataValues.firstname
                }
            })
        }
    } catch (error) {
        next(error)
    }
};

const getById = (req, res, next) => {
    let id = req.params.id;
    User.findByPk(id)
        .then(user => res.status(200).json(user))
        .catch(error => next(error))
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userObject = req.file ?
            {
                ...JSON.parse(req.body.user),
                avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...JSON.parse(req.body.user) }
        if (userObject.password || userObject.newPassword) {
            const { error } = userModifyValidation(userObject);
            if (error) throw new UserError(401, error.details[0].message);
        } else if (!userObject.password && !userObject.newPassword) {
            const { error } = userModifyMinValidation(userObject);
            if (error) throw new UserError(401, error.details[0].message);
        }
        let user = await User.findByPk(id);
        if (!user) throw new UserError(404, "L'utilisateur n'existe pas");
        if (userObject.avatar) {
            const filename = user.avatar.split('/images/')[1];
            if (filename != "profils.png") {
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) console.log(error);
                });
            }
            user.avatar = userObject.avatar;
        }
        if (userObject.lastname) user.lastname = userObject.lastname;
        if (userObject.firstname) user.firstname = userObject.firstname;
        if (userObject.password && userObject.newPassword) {
            let valid = await bcrypt.compare(userObject.password, user.dataValues.password)
            if (!valid) throw new AuthentificationError(401, "Le mot de passe saisie est incorrect");
            let hash = await bcrypt.hash(userObject.newPassword, 10)
            user.password = hash;
        }
        await user.save()
        return res.status(200).json({ msg: "update user" })
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        let user = await User.findByPk(id, { include: [Post, Commentaire] });
        if (!user) throw new UserError(404, "L'utilisateur n'existe pas");
        let filename = "";
        for (const commentaire of user.commentaires) {
            if (commentaire.dataValues.image) {
                filename = commentaire.dataValues.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) console.log(error);
                });
            }
        }
        for (const post of user.posts) {
            if (post.dataValues.image) {
                filename = post.dataValues.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) console.log(error);
                });
            }
        }
        filename = user.avatar.split('/images/')[1];
        if (filename != "profils.png") {
            fs.unlink(`images/${filename}`, (error) => {
                if (error) console.log(error);
            });
        }
        let ressource = await User.destroy({ where: { id: id } })
        if (ressource === 0) throw new UserError(404, "L'utilisateur n'existe pas");
        return res.status(200).json({ msg: "Delete user" })
    } catch (error) {
        next(error)
    }
}

export { signup, login, updateUser, deleteUser, getById }