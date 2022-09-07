import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
//schema commentaire
const {DataTypes} = sequelize;
const LikeComment = Bd.define('likeComment', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    commentId:{
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    postId:{
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    liked:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
})

export default LikeComment;