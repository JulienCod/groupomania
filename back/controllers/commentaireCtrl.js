import Commentaire from '../models/commentaire.js';
import fs from "fs"
import LikeComment from '../models/likeComment.js';
import { CommentError, LikeError, PostError } from '../error/customError.js';
import { formCommentValidation, formModifyValidation } from '../middlewares/formValidartion.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Post from '../models/post.js';

const getById = (req, res, next) => {
    let id = req.params.id;
    Commentaire.findByPk(id, { include: [LikeComment, User] })
        .then(commentaires => res.status(200).json(commentaires))
        .catch(error => next(error));
}

const createCommentaire = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = await decodedToken.userId;
        const body = JSON.parse(req.body.commentaire);
        let commentaire = {
            userId: userId,
            postId: body.postId,
            description: body.description
        }
        let image = req.file;
        if (image) {
            commentaire = {
                ...commentaire,
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }
        }
        if (commentaire.description) {
            const { error } = formCommentValidation(commentaire);
            if (error) throw new CommentError(401, error.details[0].message)
        }
        if (!commentaire.description && !image) {
            throw new CommentError(400, "Le commentaire doit contenir au minimum une image ou du texte")
        }
        let createComment = await Commentaire.create({ ...commentaire })
        if (createComment) {
            res.status(201).json({ commentaire: createComment, msg: "Create commentaire" })
        }
    } catch (error) {
        next(error);
    }
}

const updateCommentaire = async (req, res, next) => {
    const { id } = req.params;
    const commentObject = req.file ?
        {
            ...JSON.parse(req.body.description),
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...JSON.parse(req.body.description) }
    try {
        if (commentObject.description) {
            const { error } = formModifyValidation(commentObject);
            if (error) throw new CommentError(401, error.details[0].message);
        }
        let comment = await Commentaire.findByPk(id)
        if (!comment) throw new CommentError(404, "Le commentaire n'existe pas");
        if (commentObject.image) {
            if (comment.image) {
                const filename = comment.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) console.log(error);
                })
            }
        }
        comment.image = commentObject.image;
        comment.description = commentObject.description;
        await comment.save()
        return res.status(200).json({ msg: "update comment" })
    } catch (error) {
        next(error);
    }
}

const deleteCommentaire = async (req, res, next) => {
    const { id } = req.params;
    try {
        let comment = await Commentaire.findByPk(id)
        if (!comment) throw new CommentError(404, "Le commentaire n'existe pas");
        if (comment.image === null) {
            let ressource = await Commentaire.destroy({ where: { id: id } })
            if (ressource === 0) throw new CommentError(404, "Le commentaire n'existe pas");
            res.status(200).json({ msg: "Deleted comment" })
        } else {
            const filename = comment.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                let ressource = Commentaire.destroy({ where: { id: id } })
                if (ressource === 0) throw new CommentError(404, "Le commentaire n'existe pas");
                res.status(200).json({ msg: "Deleted comment" })
            })
        }
    } catch (error) {
        next(error);
    }
}

const like = async (req, res, next) => {
    try {
        let commentId = req.params.id;
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = await decodedToken.userId;

        const like = async () => {
            let likeComment = await LikeComment.findOne({ where: { userId: userId, postId: req.body.postId, commentId: commentId } });
            if (likeComment) {
                likeComment.liked = !likeComment.liked;
                await likeComment.save();
                return res.status(200).json({ msg: "update like comment" })
            } else {
                let like = {
                    userId: userId,
                    commentId: commentId,
                    liked: true,
                    postId: req.body.postId,
                };
                LikeComment.create({ ...like })
                    .then(() => { res.status(201).json({ msg: "Comment liked" }) })
            }
        }

        let postId = await Post.findByPk(req.body.postId, { include: [Commentaire] });
        if (!postId) throw new PostError(404, "Le post n'existe pas");
        if (postId.commentaires.length <= 0) {
            throw new CommentError(404, "Le commentaire n'existe pas");
        } else {
            let comment = await postId.commentaires.find((response) => {
                if (response.id === parseInt(commentId)) {
                    return response.id
                }
            })
            if (comment === undefined) throw new CommentError(404, "Le commentaire n'existe pas")
            await like();
        }
    } catch (error) {
        next(error);
    }
}

export { getById, createCommentaire, deleteCommentaire, updateCommentaire, like }