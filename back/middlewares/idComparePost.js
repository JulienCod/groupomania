import jwt from 'jsonwebtoken';
import { PostError, UserError } from '../error/customError.js';
import Post from '../models/post.js';

//  
const idComparePost = async (req, res, next) => {
    const {id} = req.params;
    try {
        let post = await Post.findByPk(id);
        if(!post) throw new PostError(404,"Le post n'existe pas");
        const token = req.headers.authorization.split(' ')[1];
        if(!token)throw new UserError(403,"L'utilisateur n'est pas authentifié");
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_KEY}`);
        if(!decodedToken)throw new UserError(403,"Le token n'est pas valide");
        const userId = decodedToken.userId;
        if(!userId)throw new UserError(403,"L'utilisateur à un token non valide");
        const isAdmin = decodedToken.isAdmin;
        if (!isAdmin && post.dataValues.userId !== userId) throw new UserError(403,"Requête non autorisée");    
        else{
            next()
        }
    } catch (error) {
        next(error);
    }
}

export default idComparePost;