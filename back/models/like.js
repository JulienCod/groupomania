import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
//schema commentaire
const {DataTypes} = sequelize;
const like = Bd.define('like', {
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
    postId:{
        type: DataTypes.INTEGER(10),
        allowNull: false,
    },
    commentaireID:{
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    like:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
})

export default like;