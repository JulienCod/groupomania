import User from '../models/user.js';
import bcrypt from 'bcrypt';
import userValidation from '../middlewares/userValidation.js';
import jwt from 'jsonwebtoken';
import Post from '../models/post.js';
import Commentaire from '../models/commentaire.js';
import fs from 'fs'

// fonction d'enregistrement d'un utilisateur

const signup = async (req, res) => {
    let user = JSON.parse(req.body.user);
    let image = req.file;
    console.log(req.file);
    if(image){
        user = {
            ...user,
            avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
    }
    const {error} = userValidation(user);
    if (error) return res.status(401).json(error.details[0].message);

    try {
       // hash du mot de passe
       let hash = await bcrypt.hash(user.password,10);
       user.password = hash;
       // création d'un utilisateur
       await User.create({...user});
        return res.status(201).json({msg: "Create User"});
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error: error});
    }
};

//fonction de connexion

const login = async (req, res) => {

    try {
       // recherche de la présence de l'adresse mail dans la base de données
        let user = await User.findOne({where : {email : req.body.email}})
        if(!user) return res.status(404).json({msg: "User not found"});

        // contrôle de la validité du mot de passe
        let valid = await bcrypt.compare(req.body.password, user.dataValues.password);
        if(!valid) return res.status(401).json({msg: "Invalid password"});
        if ( user.dataValues.isAdmin) {
            return res.status(200).json({
                userId: user.dataValues.id,
                token: jwt.sign(
                    { userId: user.dataValues.id,
                      isAdmin: user.dataValues.isAdmin },
                    `${process.env.TOKEN_KEY}`,
                    { expiresIn: '24h'}
                ),
                avatar: user.dataValues.avatar,
                welcome:"true",
                lastname: user.dataValues.lastname,
                firstname: user.dataValues.firstname,
                admin: user.dataValues.isAdmin
            })
        }else{
            return res.status(200).json({
                userId: user.dataValues.id,
                token: jwt.sign(
                    { userId: user.dataValues.id,
                      isAdmin: user.dataValues.isAdmin},
                    `${process.env.TOKEN_KEY}`,
                    { expiresIn: '24h'}
                ),
                avatar: user.dataValues.avatar,
                welcome:"true",
                lastname: user.dataValues.lastname,
                firstname: user.dataValues.firstname
            })
        }
    } catch (error) {
        return res.status(500).json({msg: 'Database Error', error: error})
    }  
};

const getById = (req, res) => {
    let id = req.params.id;
    User.findByPk(id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({msg : "" + error}))
}

const updateUser = async (req, res) => {

    const {id} = req.params;
    const userObject = req.file ?
    {
        ...JSON.parse(req.body.user),
        avatar: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{...JSON.parse(req.body.user)}
    try {
        // recherche de l'identifiant de l'utilisateur
        let user = await User.findByPk(id);
        if(!user)return res.status(404).json({msg : "user not found"});
        if(userObject.avatar){
            const filename = user.avatar.split('/images/')[1];
            if (filename != "profils.png") {
                fs.unlink(`images/${filename}`,(error) =>{
                    if (error) throw error;
                    console.log(filename);
                });
            }
            user.avatar = userObject.avatar;                
        } 
        if(userObject.lastname) user.lastname = userObject.lastname;
        if(userObject.firstname) user.firstname = userObject.firstname;

        // si demande de modification du mot de passe
        if(userObject.password && userObject.newPassword){
            let valid = await bcrypt.compare(userObject.password, user.dataValues.password)
            if(!valid) return res.status(401).json({msg: "Invalid password"});

            // cryptage du nouveau mot de passe
            let hash = await bcrypt.hash(userObject.newPassword,10)
            user.password = hash;
        } 
        // enregistrement des modification dans la base de données
        await user.save()
        return res.status(200).json({msg : "update user"})    
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error : error})
        
    }
}
const deleteUser = async (req, res) => {

    const {id} =req.params;
    try {
        let user = await User.findByPk(id, {include:[Post, Commentaire]});
        if(!user) return res.status(404).json({msg: 'User not found'});
        let filename ="";
        for (const commentaire of user.commentaires) {
            if (commentaire.dataValues.image){
                filename = commentaire.dataValues.image.split('/images/')[1];
                fs.unlink(`images/${filename}`,(error) =>{
                    if (error) throw error;
                    console.log(filename);
                });
            }
        }
        for (const post of user.posts) {
            if (post.dataValues.image){
                filename = post.dataValues.image.split('/images/')[1];
                fs.unlink(`images/${filename}`,(error) =>{
                    if (error) throw error;
                    console.log(filename);
                });
            }
        }
        filename = user.avatar.split('/images/')[1];
        if (filename != "profils.png") {
            fs.unlink(`images/${filename}`,(error) =>{
                if (error) throw error;
                console.log(filename);
            });
        }
        let ressource = await User.destroy({where : {id : id}})
        if (ressource === 0) return res.status(404).json({msg: "Not found"})
        return res.status(200).json({msg: "Delete user"}) 
    } catch (error) {
        return res.status(500).json({msg : "Database Error", error: error})
    }
}

export {signup, login, updateUser, deleteUser, getById}