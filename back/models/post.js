import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
import User from './user.js';

const {DataTypes} = sequelize;
const Post = Bd.define('post', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER(10),
        allowNull: true,
    },
    content:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    commentaire:{
        type: DataTypes.STRING(1000),
        allowNull: true,
    }
})



export default Post;