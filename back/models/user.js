import sequelize from 'sequelize';
import Bd from '../config/connexionBd.js';
import Post from './post.js';
import Commentaire from './commentaire.js';
import Like from './like.js';

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
        defaultValue:"http://localhost:3000/images/profils.png" ,
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
// ***************************************************************
User.hasMany(Like, {foreignKey: 'userId', onDelete: "Cascade"});
Like.belongsTo(User, {foreignKey: 'userId'});

export default User;