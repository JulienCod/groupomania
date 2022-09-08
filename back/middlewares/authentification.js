import jwt from 'jsonwebtoken';
import { AuthentificationError, UserError } from '../error/customError.js';
import User from '../models/user.js';

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new AuthentificationError(403, "L'utilisateur n'est pas authentifié");
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        if (!decodedToken) throw new AuthentificationError(403, "Le token n'est pas valide");
        const userId = await decodedToken.userId;
        let user = await User.findByPk(userId);
        if (!user) throw new UserError(404, "L'utilisateur n'existe pas");
        else {
            next();
        }
    } catch (error) {
        next(error);
    };
};

export default auth; 