import Commentaire from '../models/commentaire.js';
import Post from '../models/post.js';
import fs from "fs"
import LikeComment from '../models/likeComment.js';

//affichage de tous les commentaires qui inclus un post
const getById = (req, res) => {
    let id = req.params.id;
    Commentaire.findByPk(id, {include:[LikeComment]})
    .then(commentaires => res.status(200).json(commentaires))
    .catch(error => res.status(500).json({msg : "" + error}))
}

// création d'un post
const createCommentaire = (req, res) => {
    let commentaire = JSON.parse(req.body.commentaire);
    let image = req.file;
    if (image){
        commentaire= {
            ...commentaire,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    }
    Commentaire.create({...commentaire})
    .then(() => {res.status(201).json({msg: "Create commentaire"})})
    .catch(error => res.status(500).json({msg : ""+error}))
}

// mise à jour d'un commentaire
const updateCommentaire = async (req, res, next) => {
    const {id} = req.params;
    const commentObject = req.file ?
    {
        ...JSON.parse(req.body.description),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :{...JSON.parse(req.body.description)}
    try {
        //recherche de l'identifiant du commentaire
        let comment = await Commentaire.findByPk(id)
        if(!comment)return res.status(404).json({msg : "commment not found"});
        if(commentObject.image){
            if(comment.image){
                const filename = comment.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                })
            }
        }
        comment.image = commentObject.image;
        comment.description = commentObject.description;
        // enregistrement des modifications du commentaire
        await comment.save()
        return res.status(200).json({msg : "update comment"})
    } catch (error) {
        return res.status(500).json({msg : "Database error", error : error})
    }
}

// supression d'un commentaire
const deleteCommentaire = async (req, res) => {
    const {id} =req.params;
    try {
        let comment = await Commentaire.findByPk(id)
        if(!comment)return res.status(404).json({msg : "comment not found"});
        if (comment.image === null){
            let ressource = await Commentaire.destroy({where : {id : id}})
            if (ressource === 0) return res.status(404).json({msg: "Not found"})
            res.status(200).json({msg: "Deleted comment"})
        }else{
            const filename = comment.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                let ressource = Commentaire.destroy({where : {id : id}})
                if (ressource === 0) return res.status(404).json({msg: "Not found"})
                res.status(200).json({msg: "Deleted comment"})
            })
        }
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error : error})
    }
}
// modifications des likes
const like = async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    try {
        let like = await LikeComment.findByPk(id);
        if(!like)return res.status(404).json({msg: 'Not Found'});
        if(body.likeId === like.dataValues.id && body.userId === like.dataValues.userId ){
            like.liked = body.liked;
            await like.save();
            return res.status(200).json({msg : "update Comment"})
        } 
    } catch (error) {
        return res.status(500).json({msg : "Database error", error : error})    
    }
}
// creation de like
const createLike = async (req, res) => {
    let id = req.params.id;
    try {
        console.log(req.body);
        let like = {
            userId : req.body.userId,
            commentId : id,
            liked: true,
            postId: req.body.postId
        };
        LikeComment.create({...like})
        .then(() => {res.status(201).json({msg: "Comment liked"})})
        .catch(error => res.status(500).json({msg : ""+error}))
    } catch (error) {
        return res.status(500).json({msg : "Database error", error : error})
    }
}

export{getById, createCommentaire, deleteCommentaire, updateCommentaire, like, createLike}