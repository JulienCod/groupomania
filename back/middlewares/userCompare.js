import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const userCompare = async (req, res, next) => {
    const {id} = req.params;
    try {
        let user = await User.findByPk(id);
        if(!user)return res.status(404).json({msg : "user not found"});
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        if (parseInt(id) !== userId) res.status(403).json({ message: 'Requête non autorisée' });
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({msg: "error compare user", error : error})
    }
};

export default userCompare;