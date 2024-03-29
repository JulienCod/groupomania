import Post from '../models/post.js';
import User from '../models/user.js';
import Commentaire from '../models/commentaire.js';
import LikePost from '../models/likePost.js';
import fs from "fs"
import { PostError } from '../error/customError.js';
import { formPostValidation, formModifyValidation } from '../middlewares/formValidartion.js';
import jwt from 'jsonwebtoken';

const getAll = (req, res, next) => {
    Post.findAll({ order: [['createdAt', 'DESC']], include: [User, LikePost] })
        .then(posts => res.status(200).json(posts))
        .catch(error => next(error));
}

const getById = (req, res, next) => {
    let id = req.params.id;
    Post.findByPk(id, { include: [Commentaire, LikePost, User] })
        .then(post => res.status(200).json(post))
        .catch(error => next(error));
}

const createPost = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = await decodedToken.userId;
        const body = JSON.parse(req.body.post);
        let post = {
            userId: userId,
            description: body.description
        }
        let image = req.file;
        if (image) {
            post = {
                ...post,
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }
        }
        if (post.description) {
            const { error } = formPostValidation(post);
            if (error) throw new PostError(401, error.details[0].message)
        }
        if (!post.description && !image) {
            throw new PostError(400, "Le post doit contenir au minimum une image ou du texte")
        }
        let createPost = await Post.create({ ...post })
        if (createPost) {
            res.status(201).json({ post: createPost, msg: "Create post" })
        }
    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const postObject = req.file ?
            {
                ...JSON.parse(req.body.description),
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } : { ...JSON.parse(req.body.description) }
        if (postObject.description) {
            const { error } = formModifyValidation(postObject);
            if (error) throw new PostError(401, error.details[0].message);
        }
        let post = await Post.findByPk(id);
        console.log(post);
        if (!post) throw new PostError(404, "Le Post n'existe pas");
        if (postObject.image) {
            if (post.image) {
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) console.log(error);
                });
            }
        }
        post.image = postObject.image;
        post.description = postObject.description;
        await post.save();
        return res.status(200).json({ msg: "update post" })
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        let post = await Post.findByPk(id, { include: [Commentaire] })
        if (!post) throw new PostError(404, "Le Post n'existe pas");
        for (const commentaire of post.commentaires) {
            if (commentaire.dataValues.image) {
                let filename = commentaire.dataValues.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) console.log(error);
                });
            }
        }
        if (post.image === null) {
            let ressource = Post.destroy({ where: { id: id } })
            if (ressource === 0) return res.status(404).json({ msg: "Not found" })
            res.status(200).json({ msg: "Deleted post" })
        } else {
            const filename = post.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                let ressource = Post.destroy({ where: { id: id } })
                if (ressource === 0) return res.status(404).json({ msg: "Not found" })
                res.status(200).json({ msg: "Deleted post" })
            })
        }
    } catch (error) {
        next(error);
    }
}

const like = async (req, res, next) => {
    try {
        let postId = req.params.id;
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = await decodedToken.userId;

        let post = await Post.findByPk(postId);
        if (!post) throw new PostError(404, "Le post n'existe pas");

        let likepost = await LikePost.findOne({ where: { postId: postId, userId: userId } });
        if (likepost) {
            likepost.liked = !likepost.liked;
            await likepost.save();
            return res.status(200).json({ msg: "update like post" })
        } else {
            let like = {
                userId: userId,
                postId: postId,
                liked: true,
            };
            LikePost.create({ ...like })
                .then(() => { res.status(201).json({ msg: "Post liked" }) })
        }
    } catch (error) {
        next(error);
    }
}

export { getAll, createPost, updatePost, deletePost, getById, like };