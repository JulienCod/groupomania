import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
import Commentaire from './commentaire.js';
import LikeComment from './likeComment.js';
import LikePost from './likePost.js';
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
// association des tables
Post.hasMany(Commentaire, {foreignKey : 'postId', onDelete : 'CASCADE'})
Commentaire.belongsTo(Post, {foreignKey : 'postId'})
Post.hasMany(LikePost, {foreignKey : 'postId', onDelete : 'CASCADE'})
LikePost.belongsTo(Post, {foreignKey : 'postId'})
Post.hasMany(LikeComment, {foreignKey : 'postId', onDelete : 'CASCADE'})
export default Post;