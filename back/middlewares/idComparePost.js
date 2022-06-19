import jwt from 'jsonwebtoken';
import { PostError } from '../error/customError.js';
import Post from '../models/post.js';

//  
const idComparePost = async (req, res, next) => {
    const {id} = req.params;
    try {
        let post = await Post.findByPk(id);
        if(!post) throw new PostError(404,"Le post n'existe pas");
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
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