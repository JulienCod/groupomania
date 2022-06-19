import jwt from 'jsonwebtoken';
import { UserError } from '../error/customError.js';
import User from '../models/user.js';

// Contrôle d'authentification de l'utilisateur et de l'existance dans la base de données
const auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = await decodedToken.userId;
        let user = await User.findByPk(userId);
        if (!user)throw new UserError(404,"L'utilisateur n'existe pas");
        else {
            next();
        }
    } catch (error) {
        next(error);
    };
};

export default auth; 