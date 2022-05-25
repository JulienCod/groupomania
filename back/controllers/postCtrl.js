import Post from '../models/post.js';

// affichage de tout les posts
const getAll = async (req, res, next) => {
    Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({msg: ""+error}))
}

// création d'un post
const createPost = (req, res, next) => {
    const {body} = req;
    Post.create({...body})
    .then(() => {res.status(201).json({msg: "Create post"})})
    .catch(error => res.status(500).json({msg : ""+error}))
}

// mise à jour d'un post
const updatePost = async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;

    try {
        //recherche de l'identifiant du post
        let post = await  Post.findByPk(id)
        if(!post)return res.status(404).json({msg : "post not found"});
        post.content = body.content;
        post.commentaire = body.commentaire;
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
        let ressource = await Post.destroy({where : {id : id}})
        if (ressource === 0) return res.status(404).json({msg: "Not found"})
        res.status(200).json({msg: "Deleted post"})
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error : error})
    }
}

export {getAll, createPost, updatePost, deletePost};