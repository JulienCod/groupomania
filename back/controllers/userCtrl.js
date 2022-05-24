import User from '../models/user.js';
import bcrypt from 'bcrypt';
import userValidation from '../middlewares/userValidation.js';
import jwt from 'jsonwebtoken';

// fonction d'enregistrement d'un utilisateur

const signup = (req, res, next) => {
    const {body} = req;
    const {error} = userValidation(body);
    if (error) return res.status(401).json(error.details[0].message);
    bcrypt.hash(body.password,10)
    .then(hash => {
        body.password = hash
        User.create({...body})
        .then(() => {res.status(201).json({msg: "Create User"})})
        .catch(error => res.status(500).json({msg : ""+error}))
    })
    .catch(error => res.status(500).json({msg : "user not created" + error}))
};

//fonction de connexion

const login = async (req, res, next) => {
    await User.findOne({where : {email : req.body.email}})
    .then(user => {
        if(!user)return res.status(404).json({msg: "User not found"});
        bcrypt.compare(req.body.password, user.dataValues.password)
            .then(valid => {
                if(!valid)return res.status(401).json({msg: "Invalid password"});
                res.status(200).json({
                    userId: user.dataValues.id,
                    token: jwt.sign(
                        { userId: user.dataValues.id },
                        `${process.env.TOKEN_KEY}`,
                        { expiresIn: '24h'}
                    )
                })
            })
            .catch(error => res.status(500).json({msg : ""+error}))

    })
    .catch(error => res.status(500).json({msg :""+error}));
};

export {signup, login}