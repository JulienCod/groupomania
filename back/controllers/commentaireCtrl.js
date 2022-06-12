import Commentaire from '../models/commentaire.js';
import Post from '../models/post.js';
import fs from "fs"

//affichage de tous les commentaires qui inclus un post
const getById = (req, res) => {
    let id = req.params.id;
    Post.findByPk(id, {include:[Commentaire]})
    .then(commentaires => res.status(200).json(commentaires))
    .catch(error => res.status(500).json({msg : "" + error}))
}

// création d'un post
const createCommentaire = (req, res) => {
    let commentaire = JSON.parse(req.body.commentaire);
    let image = req.file;
    console.log(commentaire + " ici 1");
    if (image){
        commentaire= {
            ...commentaire,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    }
    console.log(commentaire + " ici 2");

    Commentaire.create({...commentaire})
    .then(() => {res.status(201).json({msg: "Create commentaire"})})
    .catch(error => res.status(500).json({msg : ""+error}))
}

// mise à jour d'un commentaire
const updateCommentaire = async (req, res, next) => {
    console.log(req.body);
    const {id} = req.params;
    const commentObject = req.file ?
    {
        ...JSON.parse(req.body.description),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :{...JSON.parse(req.body.description)}
    try {
        //recherche de l'identifiant du post
        let comment = await Commentaire.findByPk(id)
        if(!comment)return res.status(404).json({msg : "commment not found"});
        if(commentObject.image){
            if(comment.image){
                console.log(comment.image);
                const filename = comment.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                })
            }
        }
        comment.image = commentObject.image;
        comment.description = commentObject.description;
        // enregistrement des modifications du post
        await comment.save()
        return res.status(200).json({msg : "update post"})
    } catch (error) {
        return res.status(500).json({msg : "Database error", error : error})
    }
}

// supression d'un commentaire
const deleteCommentaire = async (req, res) => {
    const {id} =req.params;
    try {
        let comment = await Commentaire.findByPk(id)
        if(!comment)return res.status(404).json({msg : "post not found"});
        if (comment.image === null){
            let ressource = await Commentaire.destroy({where : {id : id}})
            if (ressource === 0) return res.status(404).json({msg: "Not found"})
            res.status(200).json({msg: "Deleted commentaire"})
        }else{
            const filename = comment.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                let ressource = Commentaire.destroy({where : {id : id}})
                if (ressource === 0) return res.status(404).json({msg: "Not found"})
                res.status(200).json({msg: "Deleted post"})
            })
            console.log("ici");
        }
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error : error})
    }
}

export{getById, createCommentaire, deleteCommentaire, updateCommentaire}