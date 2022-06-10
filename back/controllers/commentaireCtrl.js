import Commentaire from '../models/commentaire.js';
import Post from '../models/post.js';

//affichage de tous les commentaires
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

// mise à jour d'un post
const updateCommentaire = async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;

    try {
        //recherche de l'identifiant du post
        let commentaire = await  Commentaire.findByPk(id)
        if(!commentaire)return res.status(404).json({msg : "post not found"});
        commentaire.content = body.content;
        commentaire.commentaire = body.commentaire;
        // enregistrement des modifications du commentaire
        await commentaire.save()
        return res.status(200).json({msg : "update commentaire"})
    } catch (error) {
        return res.status(500).json({msg : "Database error", error : error})
    }
}

// supression d'un post
const deleteCommentaire = async (req, res) => {
    const {id} =req.params;

    try {
        let ressource = await Commentaire.destroy({where : {id : id}})
        if (ressource === 0) return res.status(404).json({msg: "Not found"})
        res.status(200).json({msg: "Deleted commentaire"})
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error : error})
    }
}

export{getById, createCommentaire, deleteCommentaire, updateCommentaire}