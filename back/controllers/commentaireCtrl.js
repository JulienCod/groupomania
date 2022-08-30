import Commentaire from '../models/commentaire.js';
import fs from "fs"
import LikeComment from '../models/likeComment.js';
import { CommentError, LikeError } from '../error/customError.js';
import { formCommentValidation, formModifyValidation } from '../middlewares/formValidartion.js';

//display comment
const getById = (req, res, next) => {
    let id = req.params.id;
    Commentaire.findByPk(id, { include: [LikeComment] })
        .then(commentaires => res.status(200).json(commentaires))
        .catch(error => next(error));
}

// création d'un post
const createCommentaire = async (req, res, next) => {
    try {
        let commentaire = JSON.parse(req.body.commentaire);
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
            res.status(201).json({ msg: "Create commentaire" })
        }
    } catch (error) {
        next(error);
    }
}

// update comment
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
                fs.unlink(`images/${filename}`, () => {
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

// delete comment
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
// update like comment
const like = async (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    try {
        let like = await LikeComment.findByPk(id);
        if (!like) throw new LikeError(404, "Le like n'existe pas")
        if (body.likeId === like.dataValues.id && body.userId === like.dataValues.userId) {
            like.liked = body.liked;
            await like.save();
            return res.status(200).json({ msg: "update Comment" })
        }
    } catch (error) {
        next(error);
    }
}
// create like
const createLike = async (req, res, next) => {
    let id = req.params.id;
    try {
        let like = {
            userId: req.body.userId,
            commentId: id,
            liked: true,
            postId: req.body.postId
        };
        LikeComment.create({ ...like })
            .then(() => { res.status(201).json({ msg: "Comment liked" }) })
    } catch (error) {
        next(error);
    }
}

export { getById, createCommentaire, deleteCommentaire, updateCommentaire, like, createLike }