import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
import Commentaire from './commentaire.js';
// schema post
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
    content:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    commentaire:{
        type: DataTypes.STRING(1000),
        allowNull: true,
    }
})
// association des tables
Post.hasMany(Commentaire, {foreignKey : 'postId', onDelete : 'CASCADE'})
Commentaire.belongsTo(Post, {foreignKey : 'postId'})

export default Post;