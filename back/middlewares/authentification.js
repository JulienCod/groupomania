import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Contrôle d'authentification de l'utilisateur et de l'existance dans la base de données
const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = await decodedToken.userId;
        let user = await User.findByPk(userId);
        if (!user){
            throw 'Invalid user ID'
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ msg: "Invalid request", error: error});
    };
};

export default auth; 