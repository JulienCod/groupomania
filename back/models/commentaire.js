import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
//schema commentaire
const {DataTypes} = sequelize;
const Commentaire = Bd.define('commentaire', {
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
    image:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    description:{
        type: DataTypes.STRING(1000),
        allowNull: true,
    }
})

export default Commentaire;