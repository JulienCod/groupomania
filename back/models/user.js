import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
import Post from './post.js';
import Commentaire from './commentaire.js';
import LikeComment from './likeComment.js';
import LikePost from './likePost.js';

const URL = `${process.env.URL}`;
//schema User
const {DataTypes} = sequelize;
const User = Bd.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate :{
            isEmail: {msg: "l'adresse email est valide"}
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: URL+"images/profils.png" ,
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})

// association des tables
User.hasMany(Post, {foreignKey: 'userId', onDelete: "Cascade"});
Post.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Commentaire, {foreignKey: 'userId', onDelete: "Cascade"});
Commentaire.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(LikeComment, {foreignKey: 'userId', onDelete: "Cascade"});
LikeComment.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(LikePost, {foreignKey: 'userId', onDelete: "Cascade"});
LikePost.belongsTo(User, {foreignKey: 'userId'})

export default User;