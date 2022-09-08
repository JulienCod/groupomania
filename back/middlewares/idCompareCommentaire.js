import jwt from 'jsonwebtoken';
import Commentaire from '../models/commentaire.js';
import { CommentError, UserError } from '../error/customError.js';

const idCompareCommentaire = async (req, res, next) => {
    try {
        const { id } = req.params;
        let commentaire = await Commentaire.findByPk(id);
        if (!commentaire) throw new CommentError(404, "Le commentaire n'existe pas");
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        if (commentaire.dataValues.userId !== userId && !isAdmin) throw new UserError(403, "Requête non autorisée");
        else {
            next()
        }
    } catch (error) {
        next(error);
    }
}

export default idCompareCommentaire;