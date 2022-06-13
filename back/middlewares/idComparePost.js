import jwt from 'jsonwebtoken';
import Post from '../models/post.js';

//  compare l'identifiant à l'origine du post à l'identifiant de l'utilisateur connecté présent dans le token 
const idComparePost = async (req, res, next) => {
    const {id} = req.params;
    try {
        let post = await Post.findByPk(id);
        if(!post)return res.status(404).json({msg : "post not found"});
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        if (!isAdmin && post.dataValues.userId !== userId){
            res.status(403).json({ message: 'Requête non autorisée' });
        }    
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({msg: "error compare user", error : error})
    }
}

export default idComparePost;