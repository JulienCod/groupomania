import Post from '../models/post.js';

const getAll = async (req, res, next) => {
    Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(500).json({msg: ""+error}))
    
}

const createPost = (req, res, next) => {
    const {body} = req;
    Post.create({...body})
        .then(() => {res.status(201).json({msg: "Create post"})})
        .catch(error => res.status(500).json({msg : ""+error}))
    .catch(error => res.status(500).json({msg: ""+error}))
}

const updatePost = (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    Post.findByPk(id)
    .then((post) => {
        if(!post)return res.status(404).json({msg : "post not found"});
        post.content = body.content;
        post.commentaire = body.commentaire;
        post.save()
        .then(() => res.status(200).json({msg : "update post"}))
        .catch(error => res.status(500).json({msg : ""+error}))
    })
    .catch(error => res.status(500).json({msg : ""+error}))
}

const deletePost = (req, res, next) => {
    const {id} =req.params;
    Post.destroy({where : {id : id}})
    .then((ressource) => {
        if (ressource === 0) return res.status(404).json({msg: "Not found"})
        res.status(200).json({msg: "Deleted post"})
    })
    .catch(error => res.status(500).json({msg : ""+error}))
}

export {getAll, createPost, updatePost, deletePost};