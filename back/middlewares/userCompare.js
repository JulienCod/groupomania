import jwt from 'jsonwebtoken';
import { AuthentificationError, UserError } from '../error/customError.js';
import User from '../models/user.js';

const userCompare = async (req, res, next) => {
    try {
        const { id } = req.params;
        let user = await User.findByPk(id);
        if (!user) throw new UserError(404, "L'utilisateur n'existe pas");
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw new AuthentificationError(403, "L'utilisateur n'est pas authentifié");
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        if (!decodedToken) throw new AuthentificationError(403, "Le token n'est pas valide");
        const userId = decodedToken.userId;
        if (!userId) throw new AuthentificationError(403, "L'utilisateur à un token non valide");
        if (parseInt(id) !== userId) throw new UserError(403, "Requête non autorisée");
        else {
            next()
        }
    } catch (error) {
        next(error);
    }
};

export default userCompare;