import Post from '../models/post.js';
import User from '../models/user.js';
import Commentaire from '../models/commentaire.js';

import fs from "fs"

// affichage de tous les posts
const getAll = (req, res, next) => {
    Post.findAll({include:[User]})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({msg: ""+error}))
}

const getById = (req, res) =>{
    let id = req.params.id;
    Post.findByPk(id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(500).json({msg : "" + error}))
}

// création d'un post
const createPost = (req, res, next) => {
    let post =JSON.parse(req.body.post);
    let image = req.file;
    if(image){
        post = {
            ...post,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    }
    Post.create({...post})
    .then(() => {res.status(201).json({msg: "Create post"})})
    .catch(error => res.status(500).json({msg : ""+error}))
}

// mise à jour d'un post
const updatePost = async (req, res) => {
    const {id} = req.params;
    const postObject = req.file ?
    {
        ...JSON.parse(req.body.description),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :{...JSON.parse(req.body.description)}
    try {
        //recherche de l'identifiant du post
        let post = await Post.findByPk(id)
        if(!post)return res.status(404).json({msg : "post not found"});
        if(postObject.image){
            if(post.image){
                console.log(post.image);
                const filename = post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`,(error) =>{
                    if (error) throw error;
                    console.log(filename);
                });
            }
        }
        post.image = postObject.image;
        post.description = postObject.description;
        // enregistrement des modifications du post
        await post.save()
        return res.status(200).json({msg : "update post"})
    } catch (error) {
        return res.status(500).json({msg : "Database error", error : error})
    }
}

// supression d'un post
const deletePost = async (req, res) => {
    const {id} =req.params;
    try {
        let post = await Post.findByPk(id, {include:[Commentaire]})
        if(!post) return res.status(404).json({msg : "post not found"});
        for (const commentaire of post.commentaires) {
            if (commentaire.dataValues.image){
                let filename = commentaire.dataValues.image.split('/images/')[1];
                fs.unlink(`images/${filename}`,(error) =>{
                    if (error) throw error;
                    console.log(filename);
                });
            }
        }
        if(post.image === null){
            let ressource = Post.destroy({where : {id : id}})
            if (ressource === 0) return res.status(404).json({msg: "Not found"})
            res.status(200).json({msg: "Deleted post"})
        }else{
            const filename = post.image.split('/images/')[1];
            console.log(filename);
            fs.unlink(`images/${filename}`, () => {
                let ressource = Post.destroy({where : {id : id}})
                if (ressource === 0) return res.status(404).json({msg: "Not found"})
                res.status(200).json({msg: "Deleted post"})
            })
        }
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error : error})
    }
}

export {getAll, createPost, updatePost, deletePost, getById};