import jwt from 'jsonwebtoken';
import Commentaire from '../models/commentaire.js';

//  compare l'identifiant à l'origine du commentaire à l'identifiant de l'utilisateur connecté présent dans le token 
const idCompareCommentaire= async (req, res, next) => {
    const {id} = req.params;
    try {
        let commentaire = await Commentaire.findByPk(id);
        if(!commentaire)return res.status(404).json({msg : "commentaire not found"});
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (commentaire.dataValues.userId !== userId) res.status(403).json({ message: 'Requête non autorisée' });
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({msg: "error compare user", error : error})
    }
}

export default idCompareCommentaire;